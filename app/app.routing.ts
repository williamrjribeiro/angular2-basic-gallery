import { Injectable } from '@angular/core';
import { RoutesRecognized, Event, Params, Router, Routes, RouterModule } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

import { AppModel, Album, User, Photo } from './app.model';
import { JsonPlaceHolderService } from './jsonplaceholder.service';
import { AlbumComponent } from './album.component';
import { AboutComponent } from './about.component';
import { PhotoComponent } from './photo.component';

// Route definitions. Mapping url#paths to Components
// Routed Views/Components are rendered on <router-outlet> (on Root Component)
const appRoutes: Routes = [
    {
        path: '',
        component: AboutComponent
    },
    {
        // Dynamic route definition. path/:token1/:token2
        path: 'album/:id',
        component: AlbumComponent
    },
    {
        // Dynamic route definition. path/:token1/:token2
        path: 'photo/:id',
        component: PhotoComponent
    },
    {
        path: '**',
        redirectTo: '/',
        pathMatch: 'full'
    }
];
// Returns a configured router module adde to root NgModule, AppModule
// The forRoot method gives us the Router service providers and directives needed for routing.
export const routing = RouterModule.forRoot(appRoutes);

@Injectable()
export class AppRouter {

    private _errorMsg:string = null;
    private _routeSub:Subscription = null;

    constructor( private _appModel:AppModel
               , private _router:Router
               , private _service:JsonPlaceHolderService ){

        console.log("[AppRouter.constructor]");

        // Get the list of Albums from the web only once
        this._service.list<Album>( Album )
                     .subscribe(
                         ( albums:Album[] ) => this._appModel.setAlbums( albums ) ,
                         this._onError
                     );
        // Subscribe to Router Events. This is where we drive the App
        this._routeSub = this._router
                             .events
                             .filter( event => event instanceof RoutesRecognized )
                             .subscribe( this._onRouterEvent );
    }

    /**
     * Navigate between Albums using the Router (changes the browser URL based on selection).
     * @param  {Album}  album
     */
    navigate( album:Album ) {
        console.log("[AppRouter.navigate] album:", album);

        if (album)
            this._router.navigate( [`album/`, album.id] );
        else
            this._router.navigate( [''] );
    }

    private _parseUrl( url:string ):number {
      console.log("[AppRouter._parseUrl] url:", url);

      let arr:string[] = url.split('/');

      if( arr.length > 2 )
          return Number.parseInt( arr[2] );
      else
          return -1;
    }

    private _fetchAlbumData( album:Album ) {
        console.log("[AppRouter._fetchAlbumData] album:", album);

        if( album ){
            this._getUser( album.userId );
            this._getPhotos( album.id );
        }
    }

    private _getUser( id:number ) {
        console.log("[AppRouter._getUser] id:", id);

        let user:User = this._appModel.getUser( id );
        let currentAlbum:Album = this._appModel.currentAlbum();

        // Fetch an User if none is available or if current User.id is different from current Album.userId
        if (!user || (currentAlbum && currentAlbum.userId !== id)) {

            this._appModel.setCurrentUser( null );

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
        console.log("[AppRouter._getPhotos] albumId:", albumId);

        let currentPhotos:Photo[] = this._appModel.photos();

        if( !currentPhotos || currentPhotos.length == 0 || ( currentPhotos[0].albumId != albumId ) ) {

            this._appModel.setPhotos( null );

            this._service.list<Photo>( Photo, `?albumId=${albumId}` )
                         .subscribe(
                             ( photos:Photo[] ) => this._appModel.setPhotos( photos ),
                             this._onError
                         );
        }
    }

    private _onRouterEvent = ( event:RoutesRecognized ) => {
        console.log("[AppRouter._onRouterEvent] event:", event);

        let albumId:number = this._parseUrl( event.url );

        if( albumId < 0 ) {
            if( this._appModel.currentAlbum() )
                this._appModel.setCurrentAlbum( null );
            return;
        }

        let nextAlbum:Album = this._appModel.getAlbum( albumId );

        if( nextAlbum != this._appModel.currentAlbum() )
            this._appModel.setCurrentAlbum( nextAlbum );

        this._fetchAlbumData( nextAlbum );
    };

    private _onError = ( error:any ) => {
        console.error("[AppRouter.onError] error:", error);
        this._errorMsg = error;
    };
}
