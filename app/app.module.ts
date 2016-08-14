import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { HttpModule } from '@angular/http';

import { JsonPlaceHolderService } from './jsonplaceholder.service';
import { AppModel } from './model/app.model';
import { AlbumListComponent } from './album-list.component';
import { MediaGridComponent } from './media-grid.component';
import { UserInfoComponent } from './user-info.component';
import { PhotoComponent } from './photo.component';
import { AlbumComponent } from './album.component';
import { AboutComponent } from './about.component';
import { AppComponent } from './app.component';

import { AppRouter, routing } from './app.routing';

@NgModule({
  imports: [
      BrowserModule
    , FormsModule
    , HttpModule
    , routing
  ],
  declarations: [
      AlbumListComponent
    , MediaGridComponent
    , UserInfoComponent
    , PhotoComponent
    , AlbumComponent
    , AboutComponent
    , AppComponent
  ],
  providers: [ JsonPlaceHolderService, AppModel, AppRouter ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
    constructor(){
        console.log("[AppModule.constructor] ");
    }
}
