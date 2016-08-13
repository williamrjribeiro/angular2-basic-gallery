import { Component } from '@angular/core';

@Component({
    selector: 'about',
    template: `
      <div class="container">
        <h2>{{title}}</h2>
        <h5>Created by William R. J. Ribeiro - <a href="http://wwww.twitter.com/bill_bsb" target="_blank">@bill_bsb</a></h5>
        <h6>Using:</h6>
        <ul>
          <li>Angular2.0.0-RC.5</li>
          <li>Bootstrap4.0.0-Alpha.3</li>
        </ul>
      </div>
    `
})
export class AboutComponent {
    title = 'About';

    constructor(){
        console.log("[AboutComponent.constructor]");
    }
}
