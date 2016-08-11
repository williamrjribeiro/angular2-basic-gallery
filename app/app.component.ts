import { Component } from '@angular/core';

@Component({
    selector: 'gallery-app',
    // RouterOutlet is one of the directives provided by the RouterModule.
    // The router displays each component immediately below the <router-outlet> as we navigate through the application
    template: `
        <div class="container">
          <h1>{{title}}</h1>
          <div class="row">
            <div class="col-md-4">
              <album-list></album-list>
            </div>
            <div class="col-md-8" >
              <album></album>
            </div>
          </div>
        </div>
    `
})
// Root Component. Deals with navigation/routing
export class AppComponent {
    title = 'Angular2 Gallery';

    constructor(){
        console.log("[AppComponent.constructor]");
    }
}
