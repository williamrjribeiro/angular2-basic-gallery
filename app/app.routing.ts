import { Injectable } from '@angular/core';
import { ActivatedRoute, Event, Params, Router, Routes, RouterModule } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

import { AppModel, Album } from './app.model';
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

    private _albumSub:Subscription;

    constructor( private _appModel:AppModel
               , private _router:Router
               , private _route:ActivatedRoute ){
        console.log("[AppRouter.constructor]");
    }

    init(){
        console.log("[AppRouter.init]");

        // Listen to changes on the appModel.currentAlbum.
        // FIXME: When do I unsubscribe from this ?!
        this._albumSub = this._appModel
                             .currentAlbum$
                             .subscribe( this.navigate );
    }

    /**
     * Navigate between Albums using the Router (changes the browser URL based on selection).
     * @param  {Album}  album
     */
    navigate = ( album:Album ) => {
        console.log("[AppRouter.navigate] album:", album);

        if (album)
            this._router.navigate( [`album/`, album.id] );
        else
            this._router.navigate( [''] );
    };
}
