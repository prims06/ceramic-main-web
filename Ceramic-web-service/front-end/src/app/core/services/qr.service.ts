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
  return this.http.get<any[]>(this.baseUrl+'/lastuser').pipe(
    catchError(this.handleHttpError)
  );
}

//    getAll(){
//    this.http.get('https://jsonplaceholder.typicode.com/comments').subscribe(data =>{
//     this.data.push(data);
//     console.log(this.data);
//   }, error=> console.error(error));
// }


  fetchAll(): Observable<any[]>{
    return this.http.get<any[]>('https://jsonplaceholder.typicode.com/comments', {responseType: "json"}).pipe(
      tap((_) => console.log('fetched Codes'))
    );
  }

  fetchLastId():Observable<any>{
    return this.http.get<any>("http://localhost:3000/qr_codes", {responseType: "json"}).pipe(
      catchError(this.handleHttpError)
    );
  }

  // public create(Code):Observable<any> {
  //   // console.log(qrCode);


  //   return this.http.post<any>('https://ceramic-services.000webhostapp.com/ceramic/web/setQrCode.php', Code).pipe(
  //     catchError(this.handleHttpError));
  //   // return this.http.post<string>('http://localhost:80/ceramic/setQrCode.php', qrCode);

  // }

  public getHotels(): Observable<any> {
    return this.http.get<any[]>('https://jsonplaceholder.typicode.com/comments').pipe(
      catchError(this.handleHttpError)
    );
  }

  // const httpOptions = {
  //   headers: new HttpHeaders({
  //     'Content-Type':  'application/json',
  //     // 'Authorization': 'mon-jeton'
  //   })
  // };
  // "https://ceramic-services.000webhostapp.com/ceramic/web/setQrCode.php"
  // create(formData: FormData): Observable<any> {
  //  return this.http.post<string>('https://jsonplaceholder.typicode.com/posts', formData)
  //    .pipe(
  //      catchError(this.handleHttpError)
  //    );
  // }

  create(data): Observable<any> {
    return this.http.post<any>('http://localhost:3000/addcode', data)
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
