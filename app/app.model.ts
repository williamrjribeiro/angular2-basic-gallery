import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject }    from 'rxjs/Subject';

@Injectable()
class AppModel {

    // Observable Albums source
    private _albumsSubject:Subject<Album[]> = new Subject<Album[]>();
    // Observable Albums Stream
    albums$:Observable<Album[]> = this._albumsSubject.asObservable();

    private _photosSubject:Subject<Photo[]> = new Subject<Photo[]>();
    photos$:Observable<Photo[]> = this._photosSubject.asObservable();

    private _currentAlbum:Album;
    private _currentAlbumSubject:Subject<Album> = new Subject<Album>();
    currentAlbum$:Observable<Album>  = this._currentAlbumSubject.asObservable();

    private _currentUser:User;
    private _usersCache:Map<number, User> = new Map<number, User>();
    private _currentUserSubject:Subject<User> = new Subject<User>();
    currentUser$:Observable<User>  = this._currentUserSubject.asObservable();

    private _currentPhoto:Photo;
    private _currentPhotoSubject:Subject<Photo> = new Subject<Photo>();
    currentPhoto$:Observable<Photo>  = this._currentPhotoSubject.asObservable();

    setAlbums( albums:Album[] ) {
        console.log("[AppModel.setAlbums] albums:", albums.length);
        this._albumsSubject.next( albums );
    }

    setPhotos( photos:Photo[] ) {
        console.log("[AppModel.setPhotos] photos:", photos.length);
        this._photosSubject.next( photos );
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

    currentPhoto():Photo {
        return this._currentPhoto;
    }
}

class Geo {
    lat: number;
    lng: number;
};

class Company {
    catchPhrase: string;
    name: string;
    bs: string;
};

class Adress {
    zipcode: string;
    street: string;
    suite: string;
    city: string;
    geo: Geo;
};

class User {
    username: string;
    address: Adress;
    website: string;
    company: Company;
    email: string;
    phone: string;
    name: string;
    id: number;
};

class Photo {
  id:     number;
  albumId: number;
  title:  string;
  url:  string;
  thumbnailUrl:  string;
};

class Album {
  id:     number;
  userId: number;
  title:  string;
}

export { Geo, Company, Adress, User, Photo, Album, AppModel };
