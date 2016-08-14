import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Album } from './app.model';

@Component({
    selector: 'album-list',
    template: `
      <h4>{{title}}</h4>
      <h6 *ngIf="!albums">fetching Album list...</h6>
      <nav class="nav nav-pills nav-stacked">
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
    `
})
export class AlbumListComponent implements OnInit {

    @Input() albums: Album[];
    @Output() selected:EventEmitter<Album> = new EventEmitter<Album>();

    private title = 'Albums';
    private selectedAlbum: Album;

    constructor() {
        console.log("[AlbumListComponent.constructor]");
    }

    ngOnInit() {
        console.log("[AlbumListComponent.ngOnInit]");
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
