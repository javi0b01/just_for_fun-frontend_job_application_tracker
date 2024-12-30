import { HttpClient } from '@angular/common/http';
import { Injectable, WritableSignal, inject, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Credentials } from '../interfaces/sign';
import { StoreService } from './store.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class SignService {
  private httpClient = inject(HttpClient);
  private storeServ = inject(StoreService);
  private userServ = inject(UserService);

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
    this.setStorage(token);
    sessionStorage.setItem('JAT', token);
  }

  logout(): void {
    sessionStorage.removeItem('JAT');
    this.storeServ.clearStore();
    this.isLoggedIn.set(false);
  }

  getSessionToken(): string | null {
    return sessionStorage.getItem('JAT');
  }

  getIsLoggedIn(): boolean {
    if (!this.isLoggedIn()) {
      const token = this.getSessionToken();
      if (token) this.setStorage(token);
    }
    return this.isLoggedIn();
  }

  setStorage(token: string): void {
    const decoded = this.jwtHelpServ.decodeToken(token);
    this.storeServ.setRecordId(decoded.id);
    this.storeServ.setProfile(decoded.profile);
    this.userServ.getUserByRecord(decoded.id).subscribe({
      next: (res) => {
        if (res.message.summary === 'Done!') {
          this.storeServ.setUserId(res.data.id);
          this.storeServ.setCurrentSession(res.data);
        }
      },
      error: (err) => null,
    });
    this.isLoggedIn.set(true);
  }
}
