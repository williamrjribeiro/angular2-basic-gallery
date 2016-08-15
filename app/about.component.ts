import { Component } from '@angular/core';

@Component({
    selector: 'about',
    template: `
      <div class="jumbotron">
          <h2 class="display-3">{{_title}}</h2>
          <h5 class="lead">Created by William R. J. Ribeiro - <a href="http://wwww.twitter.com/bill_bsb" target="_blank">@bill_bsb</a></h5>
          <p>Using:</p>
          <ul>
            <li>Angular 2.0.0-RC.5</li>
            <li>Bootstrap 4.0.0-Alpha.3</li>
            <li>SystemJS</li>
            <li>Gulp</li>
          </ul>
      </div>
    `
})
export class AboutComponent {
    private _title = 'About';

    constructor(){
        console.log("[AboutComponent.constructor]");
    }
}
