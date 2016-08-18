import { Component, OnInit, OnDestroy, Input } from '@angular/core';

import { Photo } from './app.model';
import { FluidComponent } from './fluid.component';
import { PhotoModalComponent } from './photo.component';

/**
 * It's responsible displaying data about an Album mainly User info and Photos.
 * It has 2 child components: UserInfoComponent & MediaGridComponent.
 */
@Component({
    selector: 'album',
    template: `
      <photo-modal [photo]="_currentPhoto"></photo-modal>
      <div class="{{fluidClass}} height-100-md" (window:resize)="onResize()">
         <div class="row">
           <user-info [useAppModel]="true"></user-info>
         </div>
         <div class="row height-100-md">
           <media-grid [useAppModel]="true"
                       (onSelected)="_onPhotoSelected($event)">
           </media-grid>
         </div>
      </div>
    `
})
export class AlbumComponent extends FluidComponent implements OnInit, OnDestroy  {

    private _currentPhoto:Photo = null;

    constructor(){
        super();
        console.log("[AlbumComponent.constructor]");
    }

    ngOnInit(){
        console.log("[AlbumComponent.ngOnInit]");
    }

    ngOnDestroy(){
        console.log("[AlbumComponent.ngOnDestroy]");
    }

    private _onPhotoSelected( photo:Photo ){
        console.log("[AlbumComponent._onPhotoSelected] photo:", photo);
        this._currentPhoto = photo;

        if( this._currentPhoto )
            $('#photoModal').modal();
    }
}

declare var $:any; // Just for TypeScript compiler stop complaining...
