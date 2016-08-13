import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { HttpModule } from '@angular/http';

import { GenericService } from './generic.service';

import { AlbumListComponent } from './album-list.component';
import { MediaGridComponent } from './media-grid.component';
import { UserInfoComponent } from './user-info.component';
import { AlbumComponent } from './album.component';
import { AboutComponent } from './about.component';
import { AppComponent } from './app.component';

import { routing } from './app.routing';

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
    , AlbumComponent
    , AboutComponent
    , AppComponent
  ],
  providers: [
    GenericService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
    constructor(){
        console.log("[AppModule.constructor] ");
    }
}
