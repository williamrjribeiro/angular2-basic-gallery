import './rxjs-extensions';

import { Component, OnInit } from '@angular/core';
import { AppModel, Album, User, Photo } from './app.model';
import { AppRouter } from './app.routing';
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
export class AppComponent extends FluidComponent implements OnInit{

    private _errorMsg:string = null;

    constructor( private _appRouter:AppRouter, private _appModel:AppModel ){
        super();
        console.log("[AppComponent.constructor]");
    }

    ngOnInit(){
       console.log("[AppComponent.ngOnInit]");
       this._appModel.error$.subscribe( error => this._errorMsg = error.toString() );
    }

    /**
     * Handle selected events from AlbumListComponent.
     * It tells the AppRouter to navigate to the selected Album (but it can be null!)
     * @param  {Album}  album The selected Album from AlbumListComponent.
     */
    private _onAlbumSelected( album:Album ) {
        console.log("[AppComponent._onAlbumSelected] album:", album);
        this._appRouter.navigate( album );
    }
}
