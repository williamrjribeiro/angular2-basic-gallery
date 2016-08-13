import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Album } from './album.model';
import { GenericService } from './generic.service';

@Component({
    selector: 'album-list',
    template: `
      <h2>{{title}}</h2>
      <h6 *ngIf="!albums">fetching Album list...</h6>
      <nav class="nav nav-pills nav-stacked" (click)="onNavClick($event)">
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

    title = 'Album List';
    albums: Album[];
    selectedAlbum: Album;

    constructor(
          private service: GenericService
        , private router: Router,
    ) {
        console.log("[AlbumListComponent.constructor]");
    }

    ngOnInit() {
        console.log("[AlbumListComponent.ngOnInit]");
        this.service.list<Album>(Album)
            .subscribe(
            albums => this.albums = albums,
            error => console.error('[AlbumListComponent.ngOnInit] error:', error)
            );
    }

    onSelect(album: Album, event: any) {
        console.log("[AlbumListComponent.onSelect] hero.name:", album.title);
        event.preventDefault();
        if (this.selectedAlbum == album)
            this.selectedAlbum = null;
        else
            this.selectedAlbum = album;

        this.navigate();
    }

    onNavClick(event: any) {
        //console.log("[AlbumListComponent.onNavClick] event:", typeof event);
        event.preventDefault();
    }

    navigate() {
        console.log("[AlbumListComponent.navigate] selectedAlbum:", this.selectedAlbum);
        if (this.selectedAlbum)
            this.router.navigate(['/album', this.selectedAlbum.id]);
        else
            this.router.navigate(['']);
    }
}
