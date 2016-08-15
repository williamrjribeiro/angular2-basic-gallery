import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { Album, User, Photo } from './app.model';

/**
 * Responsible for communicating with http://jsonplaceholder.typicode.com/
 * Currently it only retrieves data.
 * It is @Injectable
 * @see AppModule
 */
@Injectable()
export class JsonPlaceHolderService {

    private url = 'http://jsonplaceholder.typicode.com/';  // URL to web api

    constructor( private http:Http ) {
        console.log("[JsonPlaceHolderService.constructor]");
    }

    /**
     * Fetches a list of data determined by the given data type.
     * It is async and can fail.
     * Supported data types: Album, Photo & User.
     * @type   {Function}        A constructor of the desired compatible data type.
     * @param  {Function} klass  A constructor of the desired compatible data type.
     * @param  {string}   query  A query string to be added to the end of the request. Defaults to "".
     * @return {Observable<T[]>} An Observable to which you can subscribe to.
     */
    list<T>( klass:Function, query = "" ): Observable<T[]> {
        console.log("[JsonPlaceHolderService.list]");
        return this.http.get( this.url + this.resolveServicePath(klass) + query )
            .map( ( res:Response ) => { return res.json() as T[] } )
            .catch( this.handleError );
    }

    /**
     * Fetches one data point determined by the given id and data type.
     * It is async and can fail.
     * Supported data types: Album, Photo & User.
     * @type   {Function}        A constructor of the desired compatible data type.
     * @param  {number}   id     Id of the desired data point.
     * @param  {string}   query  A query string to be added to the end of the request. Defaults to "".
     * @return {Observable<T>}   An Observable to which you can subscribe to.
     */
    get<T>( id:number, klass:Function, query = ""  ): Observable<T> {
        console.log("[JsonPlaceHolderService.getGeneric] id:", id);
        return this.http.get( this.url + this.resolveServicePath(klass) + "/" + id + query )
            .map( ( res:Response ) => { return res.json() as T; } )
            .catch( this.handleError) ;
    }

    /**
     * It determines which REST path to use by the given data type.
     * Supported data types: Album, Photo & User.
     * @param  {Function} klass The type of data.
     * @return {string}         A path string: 'albums', 'photos' or 'users'.
     * @throws {TypeError}      If an invalid type is given.
     */
    resolveServicePath( klass:Function ): string {
        console.log("[JsonPlaceHolderService.resolveServicePath] klass:", klass.name);
        switch ( klass ) {
            case Album: return "albums";
            case Photo: return "photos";
            case User: return "users";
            default: throw new TypeError(`Type ${klass.name} is not supported.`);
        }
    }

    private handleError( error:Response ) {
        console.error("[JsonPlaceHolderService.handleError] error:", error);

        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        let errMsg: string;

        if ( error.status )
            errMsg = `${error.status} - ${error.statusText}`
        else
            errMsg = 'Server error';

        return Observable.throw( errMsg );
    }
}
