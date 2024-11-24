import { Injectable } from '@angular/core';
import { IUserInfo } from '../interfaces/userInterface';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  token: string | null = null;
  recordId: string | null = null;
  profile: number | null = null;
  userId: string | null = null;
  currentSession: IUserInfo | null = null;

  reset() {
    this.token = null;
    this.recordId = null;
    this.profile = null;
    this.userId = null;
    this.currentSession = null;
  }
}
