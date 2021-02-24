import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { Privilege } from '../models/privilege.model';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  constructor(private http: HttpClient) { };


  // ------- USER OPERATIONS ------- \\
  getUsers$(): Observable<User[]> {
    return this.http.post<User[]>('/api/users', []);
  };

  getUser$(sendData): Observable<User> {
    return this.http.post<User>(`/api/users/${sendData}`, []);
  }

  updateUser$(sendData): Observable<User> {
    return this.http.put<User>(`/api/users/${sendData.ID}`, sendData);
  }

  // ------- PRIVILEGE OPERATIONS ------- \\
  getPrivs$(): Observable<Privilege[]> {
    return this.http.post<Privilege[]>('/api/privileges', []);
  }
}
