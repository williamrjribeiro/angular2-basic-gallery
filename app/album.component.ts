import { Component, OnInit, Input } from '@angular/core';

import { Album } from './album.model';
import { User } from './user.model';
import { Photo } from './photo.model';

/**
 * It's responsible displaying data about an Album mainly User info and Photos.
 * It has 2 child components: UserInfoComponent & MediaGridComponent.
 * It uses JsonPlaceHolderService to fetch User & Photo data to inject on child components.
 */
@Component({
    selector: 'album',
    template: `
      <div class="container">
         <h2 *ngIf="album" title=" Album id: {{album.id}}">{{title}}: <em>{{album.title}}</em></h2>
         <div class="row">
           <user-info [user]="user"></user-info>
         </div>
         <div class="row">
           <media-grid [photos]="photos" (selected)="onPhotoSelected($event)"></media-grid>
         </div>
      </div>
    `
})
export class AlbumComponent implements OnInit {

    @Input() user: User;
    @Input() album: Album;
    @Input() photos: Photo[];

    private title = 'Album';

    constructor() {
        console.log("[AlbumComponent.constructor]");
    }

    // Called only once per instanciation
    ngOnInit() {
        console.log("[AlbumComponent.ngOnInit]");
    }

    onPhotoSelected( photo:Photo ) {
        console.log("[AlbumComponent.onPhotoSelected] photo:", photo);
    }


}
