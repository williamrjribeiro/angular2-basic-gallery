import './rxjs-extensions';

import { AfterViewInit, Component, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { RoutesRecognized, Params, Router } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

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
        <div class="{{fluidClass}} height-100-md" (window:resize)="onResize()">
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
              <album-list [useAppModel]="true"
                          (onSelected)="_onAlbumSelected($event)">
              </album-list>
            </div>
            <div class="col-md-8 height-100-md" >
              <router-outlet></router-outlet>
            </div>
          </div>
        </div>
    `
})
export class AppComponent extends FluidComponent implements AfterViewInit, OnInit, OnDestroy {

    private _errorMsg:string = null;

    private _routeSub:Subscription = null;
    private _albumSub:Subscription = null;

    /**
     * It's the main visual component. It's two main children are: AlbumListComponent & AlbumComponent.
     * @param  {Router}                 router  Injected by AppModule
     * @param  {JsonPlaceHolderService} service Injected by AppModule
     */
    constructor(
        private _router:Router
      , private _service:JsonPlaceHolderService
      , private _appModel:AppModel
      , private _appRouter:AppRouter ){
        super();
        console.log("[AppComponent.constructor]");
    }

    ngOnInit() {
        console.log("[AppComponent.ngOnInit]");

        // Get the list of Albums from the web
        this._service.list<Album>( Album )
                     .subscribe(
                         ( albums:Album[] ) => this._appModel.setAlbums( albums ) ,
                         this._onError
                     );
    }

    ngAfterViewInit() {
        console.log("[AppComponent.ngAfterViewInit]");

        this._appRouter.init();

        this._albumSub = this._appModel
                             .currentAlbum$
                             .subscribe( this._updateAlbum );

        this._routeSub = this._router
                             .events
                             .filter( event => event instanceof RoutesRecognized )
                             .subscribe( this._onRouterEvent );
    }

    private _updateAlbum = ( album:Album ) => {
        console.log("[AppComponent._updateAlbum] album:", album);

        if( album ){
            this._getUser( album.userId );
            this._getPhotos( album.id );
        }

        this._appModel.setCurrentAlbum( album );
    }

    private _getUser( id:number ) {
        console.log("[AppComponent._getUser] id:", id);

        let user:User = this._appModel.getUser( id );
        let currentAlbum:Album = this._appModel.currentAlbum();

        // Fetch an User if none is available or if current User.id is different from current Album.userId
        if (!user || (currentAlbum && currentAlbum.userId !== id)) {

            this._service.get<User>( id, User )
                         .subscribe(
          				          ( user:User ) => this._appModel.setCurrentUser( user ),
          				          this._onError
                         );
        }
        else
            this._appModel.setCurrentUser( user );
    }

    private _getPhotos( albumId:number ) {
        console.log("[AppComponent._getPhotos] albumId:", albumId);

        let currentPhotos:Photo[] = this._appModel.photos();

        if( !currentPhotos || currentPhotos.length == 0 || ( currentPhotos[0].albumId != albumId ) ) {
            this._service.list<Photo>( Photo, `?albumId=${albumId}` )
                         .subscribe(
                             ( photos:Photo[] ) => this._appModel.setPhotos( photos ),
                             this._onError
                         );
        }
    }

    private _parseUrl( url:string ):number {
      console.log("[AppComponent._parseUrl] url:", url);

      let arr:string[] = url.split('/');

      if( arr.length > 2 )
          return Number.parseInt( arr[2] );
      else
          return -1;
    }

    /**
     * Handle selected events from AlbumListComponent.
     * @param  {Album}  album The selected Album from AlbumListComponent.
     */
    private _onAlbumSelected( album:Album ) {
        console.log("[AppComponent._onAlbumSelected] album:", album);
        this._updateAlbum( album );
    }

    private _onRouterEvent = ( event:RoutesRecognized ) => {
        let recognized:RoutesRecognized = (event as RoutesRecognized);

        console.log("[AppComponent._onRouterEvent] event:", event);

        let albumId:number = this._parseUrl( recognized.url );
        let currentAlbum:Album = this._appModel.currentAlbum();

        if(currentAlbum){
            if( albumId > 0 &&  currentAlbum.id != albumId ) {
                this._updateAlbum( this._appModel.albums().filter( a => a.id === albumId )[0] );
            }
            else if ( albumId < 0 ) {
                this._updateAlbum( null );
            }
        }
        else if( albumId > 0 ) {
            this._updateAlbum( this._appModel.albums().filter( a => a.id === albumId )[0] );
        }
    };

    private _onError = ( error:any ) => {
        console.error("[AppComponent.onError] error:", error);
        this._errorMsg = error;
    };

    ngOnDestroy(){
        console.log("[AppComponent.ngOnDestroy]");
        this._routeSub.unsubscribe();
        this._albumSub.unsubscribe();
    }
}
