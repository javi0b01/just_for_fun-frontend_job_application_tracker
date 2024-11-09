import { Injectable } from '@angular/core';
import { IUserInfo } from '../interfaces/userInterface';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  token: string | null = null;
  currentSession: IUserInfo | null = null;

  reset() {
    this.token = null;
    this.currentSession = null;
  }
}
