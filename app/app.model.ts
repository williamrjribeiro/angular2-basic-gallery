import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject }    from 'rxjs/Subject';

/**
 * All Model classes are defined on this file:
 * - AppModel: Singleton application model shared and injected everywhere.
 *   Views/UI should subscribe to its channels to self update according to changes.
 * - Album
 * - User
 * - Photo, Adress, Company, Geo
 */
@Injectable()
class AppModel {

    // A easier and quicker way of accessing the data
    private _albums:Album[];
    // Observable Albums Subject where we publish messages
    private _albumsSubject:Subject<Album[]> = new Subject<Album[]>();
    // Observable Albums Stream where messages can be read
    albums$:Observable<Album[]> = this._albumsSubject.asObservable();

    /**
     * Keep a cache of Photos to avoid making too many XHR requests and making it faster
     * TODO: Use A Least Used Cache (LRU) for this since there are too many
     *       photos and we don't need to cache everything
     * @type {Map<number, Photo>} Key is Album.id
     */
    private _photosCache:Map<number, Photo> = new Map<number, Photo>();
    private _photos:Photo[] = null;
    private _photosChannel:Subject<Photo[]> = new Subject<Photo[]>();
    photos$:Observable<Photo[]> = this._photosChannel.asObservable();

    private _currentAlbum:Album = null;
    private _currentAlbumChannel:Subject<Album> = new Subject<Album>();
    currentAlbum$:Observable<Album>  = this._currentAlbumChannel.asObservable();

    /**
     * Keep a cache of Users to avoid making too many XHR requests and making it faster
     * @type {Map<number, User>}  Key is User.id
     */
    private _usersCache:Map<number, User> = new Map<number, User>();
    private _currentUser:User = null;
    private _currentUserChannel:Subject<User> = new Subject<User>();
    currentUser$:Observable<User>  = this._currentUserChannel.asObservable();

    private _currentPhoto:Photo = null;
    private _currentPhotoChannel:Subject<Photo> = new Subject<Photo>();
    currentPhoto$:Observable<Photo>  = this._currentPhotoChannel.asObservable();

    private _errorChannel:Subject<any> = new Subject<any>();
    error$:Observable<any>  = this._errorChannel.asObservable();

    setAlbums( albums:Album[] ) {
        console.log("[AppModel.setAlbums] albums:", ( albums ? albums.length : albums ) );

        // Only update if new data is different than current
        if( this._albums == albums )
            return;

        // Update current and publish changes to channel
        this._albums = albums;
        this._albumsSubject.next( albums );
    }

    setPhotos( photos:Photo[] ) {
        console.log("[AppModel.setPhotos] photos:", ( photos ? photos.length : photos ) );

        if( this._photos == photos )
            return;

        this._photos = photos;
        this._photosChannel.next( photos );
    }

    setCurrentAlbum( album:Album ) {
        console.log("[AppModel.setCurrent] album:", album);

        if( this._currentAlbum == album )
            return;

        this._currentAlbum = album;
        this._currentAlbumChannel.next( album );
    }

    setCurrentUser( user:User ) {
        console.log("[AppModel.setCurrent] user:", user);

        if( this._currentUser == user )
            return;

        this._currentUser = user;
        this._currentUserChannel.next( user );

        if( user )
            this._usersCache.set( user.id, user );
    }

    setCurrentPhoto( photo:Photo ) {
        console.log("[AppModel.setCurrentPhoto] photo:", photo);

        if( this._currentPhoto == photo )
            return;

        this._currentPhoto = photo;
        this._currentPhotoChannel.next( photo );
    }

    setError = ( error:any ) => {
        console.error("[AppModel.setCurrent] error:", error);
        this._errorChannel.next( error );
    }

    getUser( id:number ):User {
        return this._usersCache.get( id );
    }

    getAlbum( id:number ):Album {
        return this._albums.filter( a => a.id == id )[0];
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

    albums():Album[] {
        return this._albums;
    }

    photos():Photo[] {
      return this._photos;
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
