import { Component } from '@angular/core';

@Component({
    selector: 'user-info',
    template: `
      <div class="container">
        <h3>{{title}}</h3>
      </div>
    `
})
export class UserInfoComponent {
    title = 'User Info';

    constructor(){
        console.log("[UserInfoComponent.constructor]");
    }
}
