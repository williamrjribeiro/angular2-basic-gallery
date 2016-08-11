import { Component } from '@angular/core';

@Component({
    selector: 'album-list',
    template: `
      <h2>{{title}}</h2>
    `
})
export class AlbumListComponent {
    title = 'Album List';

    constructor(){
        console.log("[AlbumListComponent.constructor]");
    }
}
