import { Injectable, signal } from '@angular/core';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedUserSignal = signal('-ORYWmMOaBoN7Y_0dNBY')
  private loggedNameUserSignal = signal('Carlos')

  constructor(storageService: StorageService) { }

  get loggedUser() {
    return this.loggedUserSignal.asReadonly()
  }

  get loggedNameUser() {
    return this.loggedNameUserSignal.asReadonly()
  }
}
