import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  constructor(private http: HttpClient) { };

  getUsers(): Observable<User[]> {
    return this.http.post<User[]>('/api/users', []);
  };

  // getUser(sendData): Observable<any> {
  //   const post = this.http.post<any>(`/api/users/:userID`, sendData);
  //   return post;
  // };
}
