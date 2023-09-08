import { Injectable, ErrorHandler } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders,HttpParams} from '@angular/common/http';
// import { HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError,tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class QrService {
  private baseUrl = 'http://localhost:3000';
  constructor( private http: HttpClient) {
   }

   getAll(): Observable<any[]>{
    return this.http.get<any[]>(this.baseUrl+'/utilisateurs').pipe(
      catchError(this.handleHttpError)
    );
 }

 getLastUser(): Observable<any[]>{
  return this.http.get<any[]>(`${this.baseUrl}/lastuser`).pipe(
    catchError(this.handleHttpError)
  );
}

getLastPaiements(): Observable<any[]>{
  return this.http.get<any[]>(`${this.baseUrl}/paiements`).pipe(
    catchError(this.handleHttpError)
  );
}

findCode(code): Observable<any[]>{
  return this.http.get<any[]>(`${this.baseUrl}/findcode/${code}`).pipe(
    catchError(this.handleHttpError)
  );
}

getStats(): Observable<any>{
  return this.http.get<any>(`${this.baseUrl}/stats`).pipe(
    catchError(this.handleHttpError)
  );
}

getScanDetail(id): Observable<any>{
  return this.http.get<any>(`${this.baseUrl}/scan-detail/${id}`).pipe(
    catchError(this.handleHttpError)
  );
}




getLogin(pwd:String): Observable<any>{
  return this.http.post<any>(`${this.baseUrl}/login`, {pwd:pwd}).pipe(catchError(this.handleHttpError));
 }

  fetchLastId():Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/qr_codes`, {responseType: "json"}).pipe(
      catchError(this.handleHttpError)
    );
  }



  create(data): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/addcode`, data)
      .pipe(
        catchError(this.handleHttpError)
      );
   }



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
