import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { StoreService } from './store.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private httpClient = inject(HttpClient);
  private storeServ = inject(StoreService);

  private jwtHelpServ = new JwtHelperService();

  private api = 'http://localhost:4000/';

  getRoot(): Observable<any> {
    return this.httpClient.get(this.api);
  }
}
