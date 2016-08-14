import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

import { Photo } from './app.model';

@Component({
    selector: 'media-grid',
    template: `
    <div class="container">
      <h6 *ngIf="!photos">fetching Album Photos...</h6>
      <div *ngIf="photos" class="row">

        <div *ngFor="let photo of photos"
             role="presentation"
             class="col-lg-3 col-md-4 col-xs-6 thumb">

          <figure class="figure"
             (click)="onSelect(photo)"
             title="The photo {{photo.title}} from Album {{photo.albumId}}">
            <img src="{{photo.thumbnailUrl}}"
                 class="figure-img img-fluid img-rounded"
                 alt=""/>
            <figcaption class="figure-caption cut-off">{{photo.title}}</figcaption>
          </figure>
        </div>
      </div>
    </div>
    `
})
export class MediaGridComponent implements OnInit {
    @Input()  photos:Photo[];
    @Output() selected:EventEmitter<Photo> = new EventEmitter<Photo>();

    constructor(){
        console.log("[MediaGridComponent.constructor]");
    }

    ngOnInit() {
        console.log("[MediaGridComponent.ngOnInit]");
    }

    onSelect(photo:Photo) {
        console.log("[MediaGridComponent.onSelect] photo.title:", photo.title);

        // Dispatch/Emit the selected event/message so other parts of UI can update (AlbumComponent)
        this.selected.emit(photo);
    }
}
