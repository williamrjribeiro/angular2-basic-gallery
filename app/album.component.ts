import { Component, OnInit, OnDestroy, Input } from '@angular/core';

import { Album, User, Photo } from './app.model';

/**
 * It's responsible displaying data about an Album mainly User info and Photos.
 * It has 2 child components: UserInfoComponent & MediaGridComponent.
 * It uses JsonPlaceHolderService to fetch User & Photo data to inject on child components.
 */
@Component({
    selector: 'album',
    template: `
      <div class="container">
         <h2 *ngIf="album" title=" Album id: {{album.id}}">Album: <em>{{album.title}}</em></h2>
         <div class="row">
           <user-info [useAppModel]="true"></user-info>
         </div>
         <div class="row">
           <media-grid [useAppModel]="true"
                       (selected)="onPhotoSelected($event)">
           </media-grid>
         </div>
      </div>
    `
})
export class AlbumComponent implements OnInit, OnDestroy  {

    constructor() {
        console.log("[AlbumComponent.constructor]");
    }

    // Called only once per instanciation
    ngOnInit() {
        console.log("[AlbumComponent.ngOnInit]");
    }

    ngOnDestroy() {
        console.log("[AlbumComponent.ngOnDestroy]");
    }

    onPhotoSelected( photo:Photo ) {
        console.log("[AlbumComponent.onPhotoSelected] photo:", photo);
    }
}
