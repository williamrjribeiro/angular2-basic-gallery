import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { Album } from './album.model';

@Injectable()
export class AlbumService {
    private url = 'http://jsonplaceholder.typicode.com/albums/';  // URL to web api

    constructor(private http: Http) {
        console.log("[AlbumService.constructor]");
    }

    getAlbums(): Observable<Album[]> {
        console.log("[AlbumService.getAlbums]");
        return this.http.get(this.url)
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        let bodyJson = res.json();
        console.log("[AlbumService.extractData] bodyJson:", bodyJson);
        return bodyJson.data || bodyJson;
    }

    private handleError(error: any) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        let errMsg: string;

        if (error.message)
            errMsg = error.message;
        else if (error.status)
            errMsg = `${error.status} - ${error.statusText}`
        else
            errMsg = 'Server error';

        console.log("[AlbumService.handleError] errMsg:", errMsg);

        return Observable.throw(errMsg);
    }
}
