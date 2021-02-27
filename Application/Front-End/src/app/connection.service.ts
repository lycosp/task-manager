import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { Privilege } from '../models/privilege.model';

const HOST = 'http://localhost:3000'

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  constructor(private http: HttpClient) { };


  // ------- USER OPERATIONS ------- \\
  getUsers$(): Observable<User[]> {
    return this.http.post<User[]>(HOST + '/api/users', []);
  };

  getUser$(sendData): Observable<User> {
    return this.http.post<User>(HOST + `/api/users/${sendData}`, []);
  }

  updateUser$(sendData): Observable<User> {
    return this.http.put<User>(HOST + `/api/users/${sendData.ID}`, sendData);
  }

  removeUser$(sendData): Observable<User> {
    return this.http.delete<User>(HOST + `/api/users/${sendData}`);
  }

  addUser$(sendData): Observable<User> {
    return this.http.put<User>(HOST + '/api/users', sendData);
  }

  // ------- PRIVILEGE OPERATIONS ------- \\
  getPrivs$(): Observable<Privilege[]> {
    return this.http.post<Privilege[]>(HOST + '/api/privileges', []);
  }
}
