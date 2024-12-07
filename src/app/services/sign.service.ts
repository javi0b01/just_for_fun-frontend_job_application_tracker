import { HttpClient } from '@angular/common/http';
import { Injectable, WritableSignal, inject, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Credentials } from '../interfaces/sign';
import { StoreService } from './store.service';

@Injectable({
  providedIn: 'root',
})
export class SignService {
  private httpClient = inject(HttpClient);
  private storeServ = inject(StoreService);

  private jwtHelpServ = new JwtHelperService();

  private api = 'http://localhost:4000/api/';

  isLoggedIn: WritableSignal<boolean> = signal(false);

  signUp(credentials: Credentials): Observable<any> {
    return this.httpClient.post(this.api + 'sign-up', credentials);
  }

  signIn(credentials: Credentials): Observable<any> {
    return this.httpClient.post(this.api + 'sign-in', credentials);
  }

  login(token: string): void {
    const decoded = this.jwtHelpServ.decodeToken(token);
    this.storeServ.token = token;
    this.storeServ.recordId = decoded.id;
    this.storeServ.profile = decoded.profile;
    this.isLoggedIn.set(true);
    localStorage.setItem('JAT', token);
  }

  logout(): void {
    this.storeServ.reset();
    this.isLoggedIn.set(false);
    localStorage.removeItem('JAT');
  }

  getLocalToken(): string | null {
    return localStorage.getItem('JAT');
  }

  getIsLoggedIn(): boolean {
    if (this.getLocalToken()) {
      this.isLoggedIn.set(true);
      return true;
    }
    this.isLoggedIn.set(false);
    return false;
  }
}
