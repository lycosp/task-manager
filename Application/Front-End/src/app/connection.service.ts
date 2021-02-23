import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { UsersComponent } from './users/users.component';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  constructor(private http: HttpClient) { };

  getUsers(): Observable<User[]> {
    return this.http.post<User[]>('/api/users', []);
  };

  users$(): Observable<User[]> {
    return this.http.post<User[]>('/api/users', []).pipe(map((data: User[]) => {
      return data;
    }));
  };

  getUser(sendData): Observable<any> {
    return this.http.post(`/api/users/:userID`, sendData);
  };
}
