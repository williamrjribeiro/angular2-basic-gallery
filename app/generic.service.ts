import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { Album } from './album.model';
import { User } from './user.model';
import { Photo } from './photo.model';

@Injectable()
export class GenericService {
    private url = 'http://jsonplaceholder.typicode.com/';  // URL to web api

    constructor(private http: Http) {
        console.log("[GenericService.constructor]");
    }

    list<T>( klass:Function ): Observable<T[]> {
        console.log("[GenericService.list]");
        return this.http.get( this.url + this.resolveServicePath(klass) )
            //.map(this.extractData)
            .map( (res:Response) => { return res.json() as T[] })
            .catch(this.handleError);
    }

    get<T>(id: number, klass:Function): Observable<T> {
        console.log("[GenericService.getGeneric] id:", id);
        return this.http.get( this.url + this.resolveServicePath(klass) + "/" + id)
            //.map(this.extractData)
            .map( (res:Response) => { return res.json() as T })
            .catch(this.handleError);
    }

    resolveServicePath(klass: Function): string {
        console.log("[GenericService.resolveServicePath] klass:", klass.name);
        switch (klass) {
            case Album: return "albums";
            case Photo: return "photos";
            case User: return "users";
            default: return "";
        }
    }

    private extractData(res: Response) {
        let bodyJson = res.json();
        console.log("[GenericService.extractData] bodyJson:", typeof bodyJson);
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

        console.log("[GenericService.handleError] errMsg:", errMsg);

        return Observable.throw(errMsg);
    }
}
