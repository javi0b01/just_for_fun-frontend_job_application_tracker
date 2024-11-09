import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Credentials } from '../interfaces/sign';
import { StoreService } from './store.service';

@Injectable({
  providedIn: 'root',
})
export class SignService {
  private httpClient = inject(HttpClient);
  private storeServ = inject(StoreService);

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

  login(token: string): void {
    this.storeServ.token = token;
    localStorage.setItem('JAT', token);
  }

  logout(): void {
    console.log('before: ', this.storeServ.token);
    console.log('before: ', this.storeServ.currentSession);
    this.storeServ.reset();
    console.log('after: ', this.storeServ.token);
    console.log('after: ', this.storeServ.currentSession);
    localStorage.removeItem('JAT');
  }

  getLocalToken(): string | null {
    return localStorage.getItem('JAT');
  }
}
