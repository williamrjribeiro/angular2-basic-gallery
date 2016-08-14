import { Component } from '@angular/core';

@Component({
    selector: 'about',
    template: `
      <div class="container">
        <h2>{{title}}</h2>
      </div>
    `
})
export class PhotoComponent {
    title = 'Photo';

    constructor(){
        console.log("[PhotoComponent.constructor]");
    }
}
