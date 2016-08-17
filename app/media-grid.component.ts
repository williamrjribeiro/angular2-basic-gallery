import { AfterViewInit, Component, EventEmitter, Input, OnInit, OnDestroy, Output } from '@angular/core';

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

          <figure class="figure"
             (click)="_onSelect(photo)"
             title="The photo {{photo.title}} from Album {{photo.albumId}}">
            <img src="{{photo.thumbnailUrl}}"
                 class="figure-img img-fluid img-rounded"
                 alt=""/>
            <figcaption class="figure-caption text-xs-left">{{photo.title}}</figcaption>
          </figure>
        </div>
      </div>
    </div>
    `
})
export class MediaGridComponent extends FluidComponent implements AfterViewInit, OnInit, OnDestroy {

    @Input()  useAppModel:boolean = false;
    @Input()  photos:Photo[] = null;
    @Output() onSelected:EventEmitter<Photo> = new EventEmitter<Photo>();

    private _photosSub:Subscription = null;

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
        }
    }

    ngAfterViewInit() {
        console.log("[MediaGridComponent.ngAfterViewInit]");
        if( this.useAppModel )
            this.photos = this._appModel.photos();
    }

    ngOnDestroy() {
        console.log("[MediaGridComponent.ngOnDestroy]");
        if( this._photosSub )
            this._photosSub.unsubscribe();
        this.photos = null;
    }

    private _onSelect( photo:Photo ) {
        console.log("[MediaGridComponent._onSelect] photo.title:", photo.title);
        // Dispatch/Emit the selected event/message so other parts of UI can update (AlbumComponent)
        this.onSelected.emit(photo);
    }
}
