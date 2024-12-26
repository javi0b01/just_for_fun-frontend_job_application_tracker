import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../interfaces/userInterface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private httpClient = inject(HttpClient);

  private api = 'http://localhost:4000/api/';

  createUser(user: any): Observable<any> {
    const payload = new FormData();
    payload.append('recordId', user.recordId);
    payload.append('firstName', user.firstName);
    payload.append('lastName', user.lastName);
    payload.append('nickname', user.nickname);
    payload.append('image', user.image);
    payload.append('phone', user.phone);
    payload.append('birthDay', user.birthDay);
    return this.httpClient.post(`${this.api}users`, payload);
  }

  getUserByRecord(id: string): Observable<any> {
    return this.httpClient.get(`${this.api}users/record/${id}`);
  }
}
