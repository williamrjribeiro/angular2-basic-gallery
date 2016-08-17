import { Component, EventEmitter, Input, OnInit, OnDestroy, Output } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

import { AppModel, Album } from './app.model';

@Component({
    selector: 'album-list',
    template: `
      <div class="height-100-md">
        <h4 title="Click on item to toggle album selection">Available albums:</h4>
        <h6 *ngIf="!albums">fetching Album list...</h6>
        <nav class="height-100-md scroll-list scroll-list-md-2 nav nav-pills nav-stacked">
            <a *ngFor="let album of albums;"
               role="presentation"
               class="nav-link"
               [class.active]="album === selectedAlbum"
               (click)="_onSelect(album, $event)"
               title="Album id: {{album.id}} - User id: {{album.userId}}"
               href="#">
                {{album.title | uppercase}}
            </a>
        </nav>
      </div>
    `
})
export class AlbumListComponent implements OnInit, OnDestroy {

    @Input()  useAppModel:boolean = false;
    @Input()  albums: Album[] = null;
    @Input()  selectedAlbum: Album = null;
    @Output() onSelected:EventEmitter<any[]> = new EventEmitter<any[]>();

    private _albumsSub:Subscription = null;
    private _albumSub:Subscription = null;

    constructor( private _appModel:AppModel ) {
        console.log("[AlbumListComponent.constructor]");
    }

    ngOnInit() {
        console.log("[AlbumListComponent.ngOnInit] useAppModel:", this.useAppModel);
        if( this.useAppModel ){

            this._albumsSub = this._appModel
                                  .albums$
                                  .subscribe( ( albums:Album[] ) => this.albums = albums );

            this._albumSub = this._appModel
                                 .currentAlbum$
                                 .subscribe( (album:Album) => this.selectedAlbum = album );
        }
    }

    ngOnDestroy() {
        console.log("[AlbumListComponent.ngOnDestroy]");
        if( this._albumsSub )
            this._albumsSub.unsubscribe();

        if( this._albumSub )
            this._albumSub.unsubscribe();

        this.albums = null;
        this.selectedAlbum = null;
    }

    private _toggleSelection( album:Album ) {
        console.log("[AlbumListComponent._toggleSelection] album:", album);

        if ( this.selectedAlbum == album )
            this.useAppModel ? this._appModel.setCurrentAlbum( null ) : this.selectedAlbum = null;
        else
            this.useAppModel ? this._appModel.setCurrentAlbum( album )  : this.selectedAlbum = album;
    }

    private _onSelect(album: Album, event: any) {
        console.log("[AlbumListComponent._onSelect] album:", album);
        // Don't allow link click to navigate
        event.preventDefault();
        this._toggleSelection( album );
    }
}
