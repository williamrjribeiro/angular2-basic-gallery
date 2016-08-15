import { Component, OnInit, OnDestroy, Input } from '@angular/core';

import { Photo } from './app.model';
import { FluidComponent } from './fluid.component';

/**
 * It's responsible displaying data about an Album mainly User info and Photos.
 * It has 2 child components: UserInfoComponent & MediaGridComponent.
 * It uses JsonPlaceHolderService to fetch User & Photo data to inject on child components.
 */
@Component({
    selector: 'album',
    template: `
      <div class="{{fluidClass}} height-100-md" (window:resize)="onResize()">
         <div class="row">
           <user-info [useAppModel]="true"></user-info>
         </div>
         <div class="row height-100-md">
           <media-grid [useAppModel]="true"
                       (selected)="onPhotoSelected($event)">
           </media-grid>
         </div>
      </div>
    `
})
export class AlbumComponent extends FluidComponent implements OnInit, OnDestroy  {

    constructor(){
        super();
        console.log("[AlbumComponent.constructor]");
    }

    // Called only once per instanciation
    ngOnInit(){
        console.log("[AlbumComponent.ngOnInit]");
    }

    ngOnDestroy(){
        console.log("[AlbumComponent.ngOnDestroy]");
    }

    onPhotoSelected( photo:Photo ){
        console.log("[AlbumComponent.onPhotoSelected] photo:", photo);
    }
}
