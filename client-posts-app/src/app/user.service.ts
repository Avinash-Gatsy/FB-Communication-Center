import { Injectable } from '@angular/core';

@Injectable()
export class UserService {
  private isUserLoggedIn;
  private userId;
  constructor() {
    this.isUserLoggedIn = false;
  }
  setUserLoggedIn() {
    this.isUserLoggedIn = true;
  }
  getUserLoggedIn() {
    return this.isUserLoggedIn;
  }
  setUserId(userId) {
    this.userId = userId;
  }
  getUserId() {
    return this.userId;
  }

}
