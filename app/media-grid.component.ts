import { Component, EventEmitter, Input, OnInit, OnDestroy, Output } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

import { AppModel, Photo } from './app.model';

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
export class MediaGridComponent implements OnInit, OnDestroy {

    @Input()  useAppModel:boolean;
    photos:Photo[];
    @Output() selected:EventEmitter<Photo> = new EventEmitter<Photo>();

    private _photosSub:Subscription;

    constructor( private appModel:AppModel ){
        console.log("[MediaGridComponent.constructor]");
    }

    ngOnInit() {
        console.log("[MediaGridComponent.ngOnInit] useAppModel:", this.useAppModel);
        if( this.useAppModel ){
            this._photosSub = this.appModel
                                  .photos$
                                  .subscribe(
                                      ( photos:Photo[] ) => this.photos = photos
                                  );
        }
    }

    onSelect(photo:Photo) {
        console.log("[MediaGridComponent.onSelect] photo.title:", photo.title);
        // Dispatch/Emit the selected event/message so other parts of UI can update (AlbumComponent)
        this.selected.emit(photo);
    }

    ngOnDestroy() {
        console.log("[MediaGridComponent.ngOnDestroy]");
        this.photos = null;
        if( this._photosSub )
            this._photosSub.unsubscribe();
    }
}
