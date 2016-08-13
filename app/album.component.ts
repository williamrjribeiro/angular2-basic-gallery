import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Params } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

import { GenericService } from './generic.service';
import { Album } from './album.model';
import { User } from './user.model';
import { Photo } from './photo.model';

@Component({
    selector: 'album',
    template: `
      <div class="container">
         <h2 *ngIf="album">{{title}}: <em>{{album.title}}</em></h2>
         <div class="row">
           <user-info [user]="user"></user-info>
         </div>
         <div class="row">
           <media-grid></media-grid>
         </div>
      </div>
    `
})
export class AlbumComponent implements OnInit {
    title = 'Album';
    album: Album;
    user: User;
    photos: Photo[];

    private sub: Subscription;

    constructor(private route: ActivatedRoute, private service: GenericService) {
        console.log("[AlbumComponent.constructor]");
    }

    // Called only once per instanciation
    ngOnInit() {
        console.log("[AlbumComponent.ngOnInit]");

        // re-use the same component instance and update the parameter.
        // detect when the route parameters change from within the same instance.
        // The observable params property handles that beautifully.
        this.sub = this.route.params.subscribe(this.onRouteParams);
    }

    onRouteParams = (params: Params) => {
        let id = +params['id']; // (+) converts string 'id' to a number

        console.log("[AlbumComponent.onRouteParams] id:", id);

        // Crashes the App if Route Param 'id' is invalid!
        this.getAlbum(id);
    };

    getAlbum(id: number) {
        console.log("[AlbumComponent.getAlbum] id:", id, ", album:", this.album);

        // Fetch an Album if none was passed or if the id from the Route is different from current Album.id
        if (!this.album || this.album.id !== id) {

            this.user = null;

            this.service.get<Album>(id, Album)
                .subscribe(
                this.onAlbumSuccess,
                error => console.error('[AlbumComponent.getAlbum] error:', error)
                );
        }
        else {
            this.getUser(this.album.userId);
            this.getPhotos(this.album.id);
        }
    }

    getUser(id: number) {
        console.log("[AlbumComponent.getUser] id:", id);

        // Fetch an User if none is available or if current User.id is different from current Album.userId
        if ( !this.user || (this.album && this.album.userId !== id) ) {

            this.user = null;

            this.service.get<User>(id, User)
                .subscribe(
                    this.onUserSuccess,
                    error => console.error('[AlbumComponent.getUser] error:', error)
                );
        }
    }

    getPhotos(albumId: number) {
        console.log("[AlbumComponent.getPhotos] albumId:", albumId);
        this.service.list<Photo>(Photo)
            .subscribe(
            this.onPhotosSuccess,
            error => console.error('[AlbumListComponent.getPhotos] error:', error)
            );
    }

    onAlbumSuccess = (album: Album) => {
        console.log("[AlbumComponent.onAlbumSuccess] album:", album);

        this.album = album;

        // Update the Album's User and Photos
        this.getPhotos(this.album.id);

        this.getUser(this.album.userId);
    };

    onUserSuccess = (user: User) => {
        console.log("[AlbumComponent.onUserSuccess] user:", user);
        this.user = user;
    };

    onPhotosSuccess = (photos: Photo[]) => {
        console.log("[AlbumComponent.onPhotosSuccess] photos.length:", photos.length);
        this.photos = photos;
    };

    ngOnDestroy() {
        console.log("[AlbumComponent.ngOnDestroy]");
        this.sub.unsubscribe();
    }
}
