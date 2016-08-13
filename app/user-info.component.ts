import { Component, OnInit, Input } from '@angular/core';

import { User } from './user.model';

@Component({
    selector: 'user-info',
    template: `
      <div class="container">
        <h6 *ngIf="!user">fetching User details...</h6>
        <h2 *ngIf="user" title="a.k.a. {{user.name}}" >by <em>{{user.username}}</em></h2>
      </div>
    `
})
export class UserInfoComponent implements OnInit {
    title = 'User Info';
    @Input() user:User;

    constructor(){
        console.log("[UserInfoComponent.constructor]");
    }

    ngOnInit() {
        console.log("[UserInfoComponent.ngOnInit]");
    }
}
