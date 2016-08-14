import { Injectable } from '@angular/core';
import { ActivatedRoute, Params, Router, Routes, RouterModule } from '@angular/router';

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

    private routeParamsSub:Subscription;

    constructor( private appModel:AppModel
               , private router:Router
               , private route:ActivatedRoute ){
        console.log("[AppRouter.constructor]");
    }

    init(){
        console.log("[AppRouter.init]");

        // Listen to changes on the appModel.currentAlbum
        this.appModel.currentAlbum$.subscribe( this.onCurrentAlbum );
    }

    onCurrentAlbum = ( album:Album ) => {
        console.log("[AppRouter.onCurrentAlbum] album:", album);
        this.navigate(album);
    }

    /**
     * Navigate between Albums using the Router (changes the browser URL based on selection).
     * @param  {Album}  album
     */
    navigate( album:Album ) {
        console.log("[AppRouter.navigate] album.id:", album.id);

        if (album)
            this.router.navigate( ['/album', album.id] );
        else
            this.router.navigate( [''] );
    }
}
