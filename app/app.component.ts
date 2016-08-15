import './rxjs-extensions';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { AppModel, Album, User, Photo } from './app.model';
import { AppRouter } from './app.routing';
import { JsonPlaceHolderService } from './jsonplaceholder.service';
import { FluidComponent } from './fluid.component';

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
        <div class="{{_containerClass}} height-100-md" (window:resize)="_onResize()">
          <h1>Angular2 Gallery</h1>
          <div *ngIf="_errorMsg" class="row">
              <div class="col-sm-12">
                  <div class="alert alert-danger" role="alert">
                      <strong>Oh snap!</strong> {{_errorMsg}}
                  </div>
              </div>
          </div>
          <div class="row height-100-md">
            <div class="col-md-4 height-100-md">
              <album-list [useAppModel]="false"
                          [albums]="_albums"
                          (selected)="onAlbumSelected($event)">
              </album-list>
            </div>
            <div class="col-md-8 height-100" >
              <router-outlet></router-outlet>
            </div>
          </div>
        </div>
    `
})
export class AppComponent implements OnInit {

    private _errorMsg:string;
    private _containerClass = 'container';

    /**
     * List of Albums to be displayed by AlbumListComponent.
     * The data is retrieved by JsonPlaceHolderService. It could have come from anywhere else.
     * @type {Album[]}
     */
    private _albums:Album[];

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
        this._onResize();
    }

    ngOnInit() {
        console.log("[AppComponent.ngOnInit]");

        this.appRouter.init();

        // Get the list of Albums from the web
        this.service.list<Album>( Album )
            .subscribe(
                this._onAlbums,
                this._onError
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

            this.service.get<User>( id, User )
                .subscribe(
				            ( user:User ) => this.appModel.setCurrentUser( user ),
				            this._onError
                );
        }
    }

    getPhotos( albumId:number ) {
        console.log("[AppComponent.getPhotos] albumId:", albumId);
        this.service.list<Photo>( Photo, `?albumId=${albumId}` )
            .subscribe(
                ( photos:Photo[] ) => this.appModel.setPhotos( photos ),
                this._onError
            );
    }

    private _onError = ( error:any ) => {
        console.error("[AppComponent.onError] error:", error);
        this._errorMsg = error;
    };

    private _onResize() {
        console.log("[AppComponent._onResize] document.body.clientWidth:", document.body.clientWidth);
        if( document.body.clientWidth > 1000 )
            this._containerClass = 'container';
        else
            this._containerClass = 'container-fluid';
    }
}
