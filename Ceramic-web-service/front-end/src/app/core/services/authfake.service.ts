import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { User } from '../models/auth.models';

@Injectable({ providedIn: 'root' })

export class AuthfakeauthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login() {
        return this.http.get<any>(`http://localhost:3000/ceramicauth`)
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                    // console.log("user :"+ user);
                    
                }
                return user;
            }));
    }

    getmdp(): Observable<any[]>{
        return this.http.get<any[]>('http://localhost:3000/ceramicauth').pipe(
          catchError(this.handleHttpError)
        );
     }

    // logout() {
    //     // remove user from local storage to log user out
    //     localStorage.removeItem('currentUser');
    //     this.currentUserSubject.next(null);
    // }



    private handleHttpError(err: HttpErrorResponse) {
        let error: string;
        if (err.error instanceof ErrorEvent) {
          // A client-side or network error occurred. Handle it accordingly.
          console.error('An error occurred:', err.error.message);
          error = `An error occurred: ${err.error.message}`;
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong.
          console.error(
            `Backend returned code ${err.status}, ` +
            `body was: ${err.error}`
          );
          error = `Backend returned code ${err.status}, body was: ${err.error}`;
        }
        // Return an observable with a user-facing error message.
        return throwError(
          'Something bad happened; please try again later.'
          + '\n'
          + error
        );
      }
}
