import { AfterViewInit, Component, OnInit, OnDestroy, Input } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

import { AppModel, User } from './app.model';

@Component({
    selector: 'user-info',
    template: `
      <div class="container">
        <h6 *ngIf="!user">fetching User details...</h6>
        <h2 *ngIf="user" title="a.k.a. {{user.name}} - id: {{user.id}}" >by <em>{{user.username}}</em></h2>
      </div>
    `
})
export class UserInfoComponent implements AfterViewInit, OnInit, OnDestroy {

    @Input() useAppModel:boolean = false;
    @Input() user:User = null;

    private _userSub:Subscription = null;

    constructor( private _appModel:AppModel ){
        console.log("[UserInfoComponent.constructor]");
    }

    ngOnInit() {
        console.log("[UserInfoComponent.ngOnInit] useAppModel:", this.useAppModel)
        if( this.useAppModel ){
            this._userSub = this._appModel
                                .currentUser$
                                .subscribe(
                                    ( user:User ) => this.user = user
                                );
        }
    }

    ngAfterViewInit() {
        console.log("[UserInfoComponent.ngAfterViewInit]");
        if( this.useAppModel )
            this.user = this._appModel.currentUser();
    }

    ngOnDestroy() {
        console.log("[UserInfoComponent.ngOnDestroy]");
        if( this._userSub )
            this._userSub.unsubscribe();
        this.user = null;
    }
}
