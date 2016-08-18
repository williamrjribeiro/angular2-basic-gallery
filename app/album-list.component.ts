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
/**
 * A selectable list of Albums that scrolls vertically.
 * - Only 1 Album can be selected at a time
 * - Items are togglable which means that if you click a selected item it will DESELECT it
 * - Items can also be toggled if the selectedAlbum is set and is present on the list
 */
export class AlbumListComponent implements OnInit, OnDestroy {

  /**
   * Flag that indicates that this component should use AppModel.
   * If true, it subscribe and updates relevant AppModel properties.
   * @type {boolean}
   * @Input
   */
    @Input()  useAppModel:boolean = false;

    /**
     * A list of Albums to be displayed.
     * Can be injected via @Input or binded to AppModel.
     * @type {Album[]}
     */
    @Input()  albums: Album[] = null;

    /**
     * The selected Album. If it's present on the list, it is toggled ON.
     * Can be injected via @Input or binded to AppModel.
     * @type {Album}
     */
    @Input()  selectedAlbum: Album = null;

    /**
     * Observable event emitter. It fires a message everytime selectedAlbum changes.
     * @type {EventEmitter<Album>}
     */
    @Output() onSelected:EventEmitter<Album> = new EventEmitter<Album>();

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
        if( this._albumsSub ) {
            this._albumsSub.unsubscribe();
            this._albumsSub = null;
        }

        if( this._albumSub ) {
            this._albumSub.unsubscribe();
            this._albumSub = null;
        }

        this.albums = null;
        this.selectedAlbum = null;
    }

    private _toggleSelection( album:Album ) {
        console.log("[AlbumListComponent._toggleSelection] album:", album);

        if ( this.selectedAlbum == album )
            this.selectedAlbum = null;
        else
            this.selectedAlbum = album;

        if( this.useAppModel )
            this._appModel.setCurrentAlbum( this.selectedAlbum );

        this.onSelected.emit( this.selectedAlbum );
    }

    private _onSelect( album: Album, event: any ) {
        console.log("[AlbumListComponent._onSelect] album:", album);
        // Don't allow link click to navigate
        event.preventDefault();
        this._toggleSelection( album );
    }
}
