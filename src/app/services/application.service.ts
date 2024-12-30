import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApplicationService {
  private httpClient = inject(HttpClient);

  private api = 'http://localhost:4000/api/applications';

  newRegister(payload: any): Observable<any> {
    return this.httpClient.post(`${this.api}`, payload);
  }

  getList(): Observable<any> {
    return this.httpClient.get(`${this.api}`);
  }
}
