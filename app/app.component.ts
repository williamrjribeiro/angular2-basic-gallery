import './rxjs-extensions';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { Album } from './album.model';
import { JsonPlaceHolderService } from './jsonplaceholder.service';

/**
 * It's the main visual component. It's two main children are: AlbumListComponent & AlbumComponent.
 * It uses JsonPlaceHolderService to fetch Album data to be injected on AlbumListComponent for display.
 * It's also where <router-outlet> is defined.
 * @see AlbumListComponent
 */
@Component({
    selector: 'gallery-app',
    // RouterOutlet is one of the directives provided by the RouterModule.
    // The router displays each component immediately below the <router-outlet> as we navigate through the application
    template: `
        <div class="container">
          <h1>{{title}}</h1>
          <div class="row">
            <div class="col-md-4">
              <album-list [albums]="albums" (selected)="onAlbumSelected($event)"></album-list>
            </div>
            <div class="col-md-8" >
              <router-outlet></router-outlet>
            </div>
          </div>
        </div>
    `
})
export class AppComponent implements OnInit {

    private title = 'Angular2 Gallery';

    /**
     * List of Albums to be displayed by AlbumListComponent.
     * The data is retrieved by JsonPlaceHolderService. It could have come from anywhere else.
     * @type {Album[]}
     */
    private albums: Album[];

    private selectedAlbum: Album;

    private user: User;

    private photos: Photo[];

    private routeParamsSub: Subscription;

    /**
     * It's the main visual component. It's two main children are: AlbumListComponent & AlbumComponent.
     * @param  {Router}                 router  Injected by AppModule
     * @param  {JsonPlaceHolderService} service Injected by AppModule
     */
    constructor(
        private router:Router
      , private route:ActivatedRoute
      , private service:JsonPlaceHolderService ){

        console.log("[AppComponent.constructor]");
    }

    ngOnInit() {
        console.log("[AppComponent.ngOnInit]");

        // Get the list of Albums from the web
        this.service.list<Album>( Album )
            .subscribe(
                ( albums:Album[] ) => { this.albums = albums },
                error => console.error("[AppComponent.ngOnInit] error:", error)
            );

        // re-use the same component instance and update the parameter.
        // detect when the route parameters change from within the same instance.
        // The observable params property handles that beautifully.
        this.routeParamsSub = this.route.params.subscribe( this.onRouteParams );
    }

    /**
     * Handle selected events from AlbumListComponent.
     * @param  {Album}  album The selected Album from AlbumListComponent.
     */
    onAlbumSelected( album:Album ) {
        console.log("[AppComponent.onAlbumSelected] album.id:", album.id);
        this.navigate( album );
    }

    /**
     * Navigate between Albums using the Router (changes the browser URL based on selection).
     * @param  {Album}  album
     */
    navigate( album:Album ) {
        console.log("[AppComponent.navigate] album.id:", album.id);

        if (album)
            this.router.navigate( ['/album', album.id] );
        else
            this.router.navigate( [''] );
    }

    onRouteParams = ( params:Params ) => {
        let id = +params['id']; // (+) converts string 'id' to a number

        console.log("[AppComponent.onRouteParams] id:", id);

        // Crashes the App if Route Param 'id' is invalid!
        this.getAlbum( id );
    };

    getAlbum( id:number ) {
        console.log("[AppComponent.getAlbum] id:", id, ", album:", this.album);

        // Fetch an Album if none was passed or if the id from the Route is different from current Album.id
        if (!this.album || this.album.id !== id) {

            this.user = null;
            this.photos = null;

            this.service.get<Album>( id, Album )
                .subscribe(
                    this.onAlbumSuccess,
                    error => console.error('[AppComponent.getAlbum] error:', error)
                );
        }
        else {
            this.getUser( this.album.userId );
            this.getPhotos( this.album.id );
        }
    }

    getUser( id:number ) {
        console.log("[AppComponent.getUser] id:", id);

        // Fetch an User if none is available or if current User.id is different from current Album.userId
        if (!this.user || (this.album && this.album.userId !== id)) {

            this.user = null;
            this.photos = null;

            this.service.get<User>( id, User )
                .subscribe(
				            this.onUserSuccess,
				            error => console.error('[AppComponent.getUser] error:', error)
                );
        }
    }

    getPhotos( albumId:number ) {
        console.log("[AppComponent.getPhotos] albumId:", albumId);
        this.service.list<Photo>( Photo, `?albumId=${albumId}` )
            .subscribe(
                this.onPhotosSuccess,
                error => console.error('[AlbumListComponent.getPhotos] error:', error)
            );
    }

    onAlbumSuccess = ( album:Album ) => {
        console.log("[AppComponent.onAlbumSuccess] album:", album);

        this.album = album;

        // Update the Album's User and Photos
        this.getPhotos( this.album.id );

        this.getUser( this.album.userId );
    }

    onUserSuccess = ( user:User ) => {
        console.log("[AppComponent.onUserSuccess] user:", user);
        this.user = user;
    }

    onPhotosSuccess = ( photos:Photo[] ) => {
        console.log("[AppComponent.onPhotosSuccess] photos.length:", photos.length);
        this.photos = photos;
    }

    ngOnDestroy() {
        console.log("[AppComponent.ngOnDestroy]");
        this.routeParamsSub.unsubscribe();
    }
}
