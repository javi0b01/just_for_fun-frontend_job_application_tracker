import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IUserInfo } from '../interfaces/userInterface';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private _recordId = new BehaviorSubject<string | null>(null);
  private _profile = new BehaviorSubject<number | null>(null);
  private _userId = new BehaviorSubject<string | null>(null);
  private _currentSession = new BehaviorSubject<IUserInfo | null>(null);

  recordId$ = this._recordId.asObservable();
  profile$ = this._profile.asObservable();
  userId$ = this._userId.asObservable();
  currentSession$ = this._currentSession.asObservable();

  getRecordId(): string | null {
    return this._recordId.getValue();
  }

  getProfile(): number | null {
    return this._profile.getValue();
  }

  getUserId(): string | null {
    return this._userId.getValue();
  }

  getCurrentSession(): IUserInfo | null {
    return this._currentSession.getValue();
  }

  setRecordId(recordId: string | null): void {
    this._recordId.next(recordId);
  }

  setProfile(profile: number | null): void {
    this._profile.next(profile);
  }

  setUserId(userId: string | null): void {
    this._userId.next(userId);
  }

  setCurrentSession(session: IUserInfo | null): void {
    this._currentSession.next(session);
  }

  clearStore() {
    this.setRecordId(null);
    this.setProfile(null);
    this.setUserId(null);
    this.setCurrentSession(null);
  }
}
