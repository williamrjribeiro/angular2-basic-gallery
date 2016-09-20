import { Component } from '@angular/core';

/**
 * Shows basic info about the app & its developer when no Album is selected.
 */
@Component({
    selector: 'about',
    template: `
      <div class="jumbotron">
          <h2 class="display-3">{{_title}}</h2>
          <h5 class="lead">Created by William R. J. Ribeiro - <a href="http://wwww.twitter.com/bill_bsb" target="_blank">@bill_bsb</a></h5>
          <p>Using:</p>
          <ul>
            <li>Angular 2.0.0</li>
            <li>Bootstrap 4.0.0-Alpha.4</li>
            <li>SystemJS</li>
            <li>Gulp</li>
          </ul>
      </div>
    `
})
export class AboutComponent {
    _title = 'About';

    constructor(){
        console.log("[AboutComponent.constructor]");
    }
}
