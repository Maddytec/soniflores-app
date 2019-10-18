import { User } from '../model/user.model';
import { EventEmitter, Injectable } from '@angular/core';

@Injectable()
export class SharedService {

  public static instance: SharedService = null;
  user: User;
  senha: string;
  showTemplate = new EventEmitter<boolean>();

  constructor() {
    return SharedService.instance = SharedService.instance || this;
  }

  public static getInstance(): SharedService {
    if (this.instance == null) {
      this.instance = new SharedService();
    }

    return this.instance;
  }

  isLoggedIn(): boolean {
    if(this.user == null){
      return false;
    }
    return this.user.email != '';
  }
}
