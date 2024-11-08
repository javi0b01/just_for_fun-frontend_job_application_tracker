import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Credentials } from '../interfaces/sign';

@Injectable({
  providedIn: 'root',
})
export class SignService {
  private httpClient = inject(HttpClient);

  private api = 'http://localhost:4000/';

  getRoot(): Observable<any> {
    return this.httpClient.get(this.api);
  }

  signUp(credentials: Credentials): Observable<any> {
    return this.httpClient.post(this.api + 'api/sign-up', credentials);
  }

  signIn(credentials: Credentials): Observable<any> {
    return this.httpClient.post(this.api + 'api/sign-in', credentials);
  }
}
