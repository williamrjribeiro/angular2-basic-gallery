import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { HttpModule } from '@angular/http';

import { JsonPlaceHolderService } from './jsonplaceholder.service';
import { AppModel } from './app.model';
import { FluidComponent } from './fluid.component';
import { AlbumListComponent } from './album-list.component';
import { MediaGridComponent } from './media-grid.component';
import { UserInfoComponent } from './user-info.component';
import { PhotoModalComponent } from './photo.component';
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
    , PhotoModalComponent
    , AlbumComponent
    , AboutComponent
    , AppComponent
  ],
  providers: [ JsonPlaceHolderService, AppModel, AppRouter, FluidComponent ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
    constructor(){
        console.log("[AppModule.constructor] ");
    }
}
