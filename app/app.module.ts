import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { HttpModule } from '@angular/http';

import { AlbumService } from './album.service';

import { AlbumListComponent } from './album-list.component';
import { MediaGridComponent } from './media-grid.component';
import { UserInfoComponent } from './user-info.component';
import { AlbumComponent } from './album.component';
import { AppComponent } from './app.component';

//import { routing } from './app.routing';

@NgModule({
  imports: [
     BrowserModule
    ,FormsModule
    ,HttpModule
    //,routing
  ],
  declarations: [
     AlbumListComponent
    ,MediaGridComponent
    ,UserInfoComponent
    ,AlbumComponent
    ,AppComponent
  ],
  providers: [
    AlbumService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
    constructor(){
        console.log("[AppModule.constructor] ");
    }
}
