import { Component, OnInit } from '@angular/core';

import { Album } from './album.model';
import { AlbumService } from './album.service';

@Component({
    selector: 'album-list',
    template: `
      <h2>{{title}}</h2>
      <nav class="nav nav-pills nav-stacked" (click)="onNavClick($event)">
          <a *ngFor="let album of albums;"
             role="presentation"
             class="nav-link"
             [class.active]="album === selectedAlbum"
             (click)="onSelect(album, $event)"
             title="Album id: {{album.id}}"
             href="#">
              {{album.title | uppercase}}
          </a>
      </nav>
    `
})
export class AlbumListComponent implements OnInit {

    title = 'Album List';
    albums: Album[];
    selectedAlbum: Album;
    errorMessage: any;

    constructor( private albumService: AlbumService ) {
        console.log("[AlbumListComponent.constructor]");
    }

    ngOnInit() {
        console.log("[AlbumListComponent.ngOnInit]");
        this.albumService.getAlbums()
                         .subscribe(
                           albums => this.albums = albums,
                           error =>  this.errorMessage = <any>error
                         );
    }

    onSelect(album:Album, event:any) {
        console.log("[AlbumListComponent.onSelect] hero.name:", album.title);
        event.preventDefault();
        this.selectedAlbum = album;
    }

    onNavClick(event:any) {
        console.log("[AlbumListComponent.onNavClick] event:", event);
        event.preventDefault();
    }
}
