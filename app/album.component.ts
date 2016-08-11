import { Component } from '@angular/core';

@Component({
    selector: 'album',
    template: `
      <div class="container">
         <h2>{{title}}</h2>
         <div class="row">
           <user-info></user-info>
         </div>
         <div class="row">
           <media-grid></media-grid>
         </div>
      </div>
    `
})
export class AlbumComponent {
    title = 'Album';

    constructor(){
        console.log("[AlbumComponent.constructor]");
    }
}
