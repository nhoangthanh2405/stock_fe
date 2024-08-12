import { Injectable } from '@angular/core';

const USER_KEY = 'auth-user';

const ACCESS_TOKEN = 'access-toke';


@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() {}

  clean(): void {
    window.localStorage.clear();
  }

  public saveUser(user: any): void {
    window.localStorage.removeItem(USER_KEY);
    if(user.success === true){
      window.localStorage.setItem(USER_KEY, JSON.stringify(user));
      window.localStorage.setItem(ACCESS_TOKEN, user.data.token);
    }
  }

  public getUser(): any {
    const user = window.localStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return null;
  }

  public isLoggedIn(): boolean {
    const user = window.localStorage.getItem(USER_KEY);
    if (user) {
      return true;
    }
    return false;
  }
}
