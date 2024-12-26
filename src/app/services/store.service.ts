import { Injectable } from '@angular/core';
import { IUserInfo } from '../interfaces/userInterface';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private _recordId: string | null = null;
  private _profile: number | null = null;
  private _userId: string | null = null;
  private _currentSession: IUserInfo | null = null;

  getRecordId(): string | null {
    return this._recordId;
  }

  getProfile(): number | null {
    return this._profile;
  }

  getUserId(): string | null {
    return this._userId;
  }

  getCurrentSession(): IUserInfo | null {
    return this._currentSession;
  }

  setRecordId(recordId: string | null): void {
    this._recordId = recordId;
  }

  setProfile(profile: number | null): void {
    this._profile = profile;
  }

  setUserId(userId: string | null): void {
    this._userId = userId;
  }

  setCurrentSession(currentSession: IUserInfo | null): void {
    this._currentSession = currentSession;
  }

  reset() {
    this._recordId = null;
    this._profile = null;
    this._userId = null;
    this._currentSession = null;
  }
}
