import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

export interface Country {
    id: number;
    name: string;
}

export interface Category {
    id: number;
    name: string;
}

export interface Accesspoint {
    name: string,
    description: string,
    licenseId: string,
    address1: string,
    address2: string,
    country: number,
    region: string,
    zip: string,
    city: string
}

@Injectable()
export class AccesspointService {
    accesspointUrl = 'http://localhost:8080/point/';
    countryUrl = 'http://localhost:8080/country/';
    categoryUrl = 'http://localhost:8080/point/category/';

    constructor(private http: HttpClient) { }

    getCategories(id: number) {
        return this.http.get<Category[]>(this.categoryUrl + id)
            .pipe(
                retry(3), // retry a failed request up to 3 times
                catchError(this.handleError) // then handle the error
            );
    }

    getCountries() {
        return this.http.get<Country[]>(this.countryUrl)
            .pipe(
                retry(3), // retry a failed request up to 3 times
                catchError(this.handleError) // then handle the error
            );
    }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong.
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`);
        }
        // Return an observable with a user-facing error message.
        return throwError(
            'Something bad happened; please try again later.');
    }

}
