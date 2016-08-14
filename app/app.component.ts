import './rxjs-extensions';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { AppModel, Album, User, Photo } from './app.model';
import { AppRouter } from './app.routing';
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
          <h1>{{_title}}</h1>
          <div class="row">
            <div class="col-md-4">
              <album-list [useAppModel]="false"
                          [albums]="_albums"
                          (selected)="onAlbumSelected($event)">
              </album-list>
            </div>
            <div class="col-md-8" >
              <router-outlet></router-outlet>
            </div>
          </div>
        </div>
    `
})
export class AppComponent implements OnInit {

    private _title = 'Angular2 Gallery';

    /**
     * List of Albums to be displayed by AlbumListComponent.
     * The data is retrieved by JsonPlaceHolderService. It could have come from anywhere else.
     * @type {Album[]}
     */
    private _albums:Album[];

    private photos:Photo[];

    /**
     * It's the main visual component. It's two main children are: AlbumListComponent & AlbumComponent.
     * @param  {Router}                 router  Injected by AppModule
     * @param  {JsonPlaceHolderService} service Injected by AppModule
     */
    constructor(
        private router:Router
      , private route:ActivatedRoute
      , private service:JsonPlaceHolderService
      , private appModel:AppModel
      , private appRouter:AppRouter ){

        console.log("[AppComponent.constructor]");
    }

    ngOnInit() {
        console.log("[AppComponent.ngOnInit]");

        this.appRouter.init();

        // Get the list of Albums from the web
        this.service.list<Album>( Album )
            .subscribe(
                this._onAlbums,
                error => console.error("[AppComponent.ngOnInit] error:", error)
            );
    }

    _onAlbums = ( albums:Album[] ) => {
        console.log("[AppComponent._onAlbums] albums.length:", albums.length);
        this._albums = albums;
        this.appModel.setAlbums( albums );
    }

    /**
     * Handle selected events from AlbumListComponent.
     * @param  {Album}  album The selected Album from AlbumListComponent.
     */
    onAlbumSelected( album:Album ) {
        console.log("[AppComponent.onAlbumSelected] album:", album);

        if( album ){
            this.getUser( album.userId );
            this.getPhotos( album.id );
        }
        else {
            this.appModel.setCurrentAlbum( null );
            this.appModel.setCurrentUser( null );
        }

        this.appModel.setCurrentAlbum( album );
    }

    getUser( id:number ) {
        console.log("[AppComponent.getUser] id:", id);

        let user:User = this.appModel.getUser( id );
        let currentAlbum:Album = this.appModel.currentAlbum();

        // Fetch an User if none is available or if current User.id is different from current Album.userId
        if (!user || (currentAlbum && currentAlbum.userId !== id)) {

            this.photos = null;

            this.service.get<User>( id, User )
                .subscribe(
				            ( user:User ) => this.appModel.setCurrentUser( user ),
				            error => console.error('[AppComponent.getUser] error:', error)
                );
        }
    }

    getPhotos( albumId:number ) {
        console.log("[AppComponent.getPhotos] albumId:", albumId);
        this.service.list<Photo>( Photo, `?albumId=${albumId}` )
            .subscribe(
                ( photos:Photo[] ) => this.appModel.setPhotos( photos ),
                error => console.error('[AlbumListComponent.getPhotos] error:', error)
            );
    }
}
