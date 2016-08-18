import { Component, EventEmitter, Input, OnInit, OnDestroy, Output } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

import { AppModel, Photo } from './app.model';
import { FluidComponent } from './fluid.component';

@Component({
    selector: 'media-grid',
    template: `
    <div class="{{fluidClass}} height-100-md" (window:resize)="onResize()">
      <h6 *ngIf="!photos">fetching Album Photos...</h6>
      <div *ngIf="photos" class="row height-100-md scroll-list">
        <div *ngFor="let photo of photos"
             role="presentation"
             class="col-lg-3 col-md-4 col-xs-6 thumb">
          <a data-target="#photoModal" (click)="_onSelect(photo, $event)">
            <figure class="figure"
               title="The photo {{photo.title}} from Album {{photo.albumId}}">
              <img src="{{photo.thumbnailUrl}}"
                   class="figure-img img-fluid img-rounded"
                   alt=""/>
              <figcaption class="figure-caption text-xs-left">{{photo.title}}</figcaption>
            </figure>
          </a>
        </div>
      </div>
    </div>
    `
})
/**
 * Works much like AlbumListComponent but for Photos and on Grid.
 */
export class MediaGridComponent extends FluidComponent implements OnInit, OnDestroy {

    @Input()  useAppModel:boolean = false;
    @Input()  photos:Photo[] = null;
    @Input()  selectedPhoto:Photo = null;
    @Output() onSelected:EventEmitter<Photo> = new EventEmitter<Photo>();

    private _photosSub:Subscription = null;
    private _photoSub:Subscription = null;

    constructor( private _appModel:AppModel ){
        super();
        console.log("[MediaGridComponent.constructor]");
    }

    ngOnInit() {
        console.log("[MediaGridComponent.ngOnInit] useAppModel:", this.useAppModel);
        if( this.useAppModel ){
            this._photosSub = this._appModel
                                  .photos$
                                  .subscribe(
                                      ( photos:Photo[] ) => this.photos = photos
                                  );

            this._photoSub = this._appModel
                                  .currentPhoto$
                                  .subscribe(
                                      ( photo:Photo ) => this.selectedPhoto = photo
                                  );
        }
    }

    ngOnDestroy() {
        console.log("[MediaGridComponent.ngOnDestroy]");
        if( this._photosSub ) {
            this._photosSub.unsubscribe();
            this._photosSub = null;
          }

        if( this._photoSub ) {
            this._photoSub.unsubscribe();
            this._photoSub = null;
        }

        this.photos = null;
        this.selectedPhoto = null;
    }

    private _toggleSelection( photo:Photo ) {
        console.log("[MediaGridComponent._toggleSelection] photo:", photo);

        if ( this.selectedPhoto == photo )
            this.selectedPhoto = null;
        else
            this.selectedPhoto = photo;

        if( this.useAppModel )
            this._appModel.setCurrentPhoto( this.selectedPhoto );

        this.onSelected.emit( this.selectedPhoto );
    }

    private _onSelect( photo:Photo, event: any ) {
        console.log("[MediaGridComponent._onSelect] photo.title:", photo.title);

        // Don't allow link click to navigate
        event.preventDefault();
        this._toggleSelection( photo );
    }
}
