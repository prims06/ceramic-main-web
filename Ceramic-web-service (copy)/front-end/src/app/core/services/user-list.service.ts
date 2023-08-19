import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError,tap } from 'rxjs/operators';
import {utilisateur} from '../models/user.model';




@Injectable({
  providedIn: 'root'
})
export class UserListService {

  private url = "http://localhost:6700/tables/advanced";
  constructor(private http: HttpClient) { }

  fetchAll(): Observable<utilisateur[]>{
    return this.http.get<utilisateur[]>(this.url, {responseType: "json"}).pipe(
      tap((_) => console.log('fetched utilisateur'))
    );
  }
}
