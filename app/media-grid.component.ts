import { Component } from '@angular/core';

@Component({
    selector: 'media-grid',
    template: `
    <div class="container">
      <h3>{{title}}</h3>
    </div>
    `
})
export class MediaGridComponent {
    title = 'Media Grid';

    constructor(){
        console.log("[MediaGridComponent.constructor]");
    }
}
