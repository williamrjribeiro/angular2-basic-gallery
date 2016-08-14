import { Injectable } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Subject }    from 'rxjs/Subject';

import { Album } from '../album.model';
import { User } from '../user.model';
import { Photo } from '../photo.model';

@Injectable()
export class AppModel {

    // Observable Albums source
    private _albumsSubject:Subject<Album> = new Subject<Album>();
    albums$:Observable<Album> = this._albumsSubject.asObservable();

    private _photosSubject:Subject<Photo> = new Subject<Photo>();
    photos$:Observable<Photo> = this._photosSubject.asObservable();

    private _currentAlbum:Album;
    private _currentAlbumSubject:Subject<Album> = new Subject<Album>();
    currentAlbum$:Observable<Album>  = this._currentAlbumSubject.asObservable();

    private _currentUser:User;
    private _usersCache:Map<number, User> = new Map<number, User>();
    private _currentUserSubject:Subject<User> = new Subject<User>();
    currentUser$:Observable<User>  = this._currentUserSubject.asObservable();

    private _currentPhoto:Photo;

    setAlbums( albums:Album[] ) {
        console.log("[AppModel.setAlbums] albums:", albums.length);
    }

    setPhotos( photos:Photo[] ) {
        console.log("[AppModel.setPhotos] photos:", photos.length);
    }

    setCurrentAlbum( album:Album ) {
        console.log("[AppModel.setCurrent] album:", album);
        this._currentAlbumSubject.next( album );
        this._currentAlbum = album;
    }

    setCurrentUser( user:User ) {
        console.log("[AppModel.setCurrent] user:", user);
        this._currentUserSubject.next( user );

        if(user)
            this._usersCache.set( user.id, user );
    }

    getUser( id:number ):User {
        return this._usersCache.get( id );
    }

    currentAlbum():Album {
        return this._currentAlbum;
    }

    currentUser():User {
        return this._currentUser;
    }
}
