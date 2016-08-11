import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AlbumListComponent } from './album-list.component';
import { MediaGridComponent } from './media-grid.component';
import { UserInfoComponent } from './user-info.component';
import { AlbumComponent } from './album.component';
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserModule
  ],
  declarations: [
    AlbumListComponent,
    MediaGridComponent,
    UserInfoComponent,
    AlbumComponent,
    AppComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

    constructor(){
        console.log("[AppModule.constructor] ");
    }
}
