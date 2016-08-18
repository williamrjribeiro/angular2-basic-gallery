import { Component, Input, OnInit } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

import { AppModel, Photo } from './app.model';

@Component({
    selector: 'photo-modal',
    template: `
    <div class="modal fade" id="photoModal" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
            <h5 *ngIf="photo" class="modal-title" #currentUser="">Photo <em>{{photo.title}}</em></h5>
          </div>
          <div class="modal-body">
            <h6 *ngIf="!photo">fetching Photos...</h6>
            <img *ngIf="photo" src="{{photo.url}}" class="img-fluid"
                 alt="Photo {{photo.title}} - id: {{photo.id}}"
                 title="Photo {{photo.title}} - id: {{photo.id}}">
          </div>
        </div>
      </div>
    </div>
    `
})
export class PhotoModalComponent implements OnInit {

    @Input() useAppModel:boolean = false;
    @Input() photo:Photo = null;

    private _photoSub:Subscription = null;

    constructor( private _appModel:AppModel ){
        console.log("[PhotoModalComponent.constructor]");
    }

    ngOnInit() {
        console.log("[PhotoModalComponent.ngOnInit] useAppModel:", this.useAppModel);
        if( this.useAppModel ){

            this._photoSub = this._appModel
                                  .currentPhoto$
                                  .subscribe(
                                      ( photo:Photo ) => this.photo = photo
                                  );
        }
    }

    ngOnDestroy() {
        console.log("[PhotoModalComponent.ngOnDestroy]");

        if( this._photoSub ) {
            this._photoSub.unsubscribe();
            this._photoSub = null;
        }

        this.photo = null;
    }
}
