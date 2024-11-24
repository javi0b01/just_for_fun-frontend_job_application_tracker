import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private httpClient = inject(HttpClient);

  private api = 'http://localhost:4000/';

  getRoot(): Observable<any> {
    return this.httpClient.get(this.api);
  }
}
