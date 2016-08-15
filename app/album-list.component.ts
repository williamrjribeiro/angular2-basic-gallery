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
               (click)="onSelect(album, $event)"
               title="Album id: {{album.id}} - User id: {{album.userId}}"
               href="#">
                {{album.title | uppercase}}
            </a>
        </nav>
      </div>
    `
})
export class AlbumListComponent implements OnInit, OnDestroy {

    @Input() useAppModel:boolean;
    @Input() albums: Album[];
    @Output() selected:EventEmitter<Album> = new EventEmitter<Album>();

    private title = 'Albums';
    private selectedAlbum: Album;
    private _albumsSub:Subscription;

    constructor( private appModel:AppModel ) {
        console.log("[AlbumListComponent.constructor]");
    }

    ngOnInit() {
        console.log("[AlbumListComponent.ngOnInit] useAppModel:", this.useAppModel);
        if( this.useAppModel ){
            this._albumsSub = this.appModel
                                  .albums$.subscribe(
                                      ( albums:Album[] ) => this.albums = albums
                                  );
        }
    }

    ngOnDestroy() {
        console.log("[AlbumListComponent.ngOnDestroy]");
        this.albums = null;
        if( this._albumsSub )
            this._albumsSub.unsubscribe();
    }

    onSelect(album: Album, event: any) {
        console.log("[AlbumListComponent.onSelect] hero.name:", album.title);

        // Don't allow link click to navigate
        event.preventDefault();

        if ( this.selectedAlbum == album )
            this.selectedAlbum = null;
        else
            this.selectedAlbum = album;

        //this.navigate();
        this.selected.emit( this.selectedAlbum );
    }
}
