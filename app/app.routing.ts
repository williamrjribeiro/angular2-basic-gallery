import { Routes, RouterModule } from '@angular/router';

import { AlbumComponent } from './album.component';
import { AboutComponent } from './about.component';

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
        path: '**',
        redirectTo: '/',
        pathMatch: 'full'
    }
];
// Returns a configured router module adde to root NgModule, AppModule
// The forRoot method gives us the Router service providers and directives needed for routing.
export const routing = RouterModule.forRoot(appRoutes);
