import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedUserSignal = signal('-ORYWmMOaBoN7Y_0dNBY')
  // private loggedUserSignal = signal('-ORYSg0txn4MI-OPi4Yh')
  private loggedNameUserSignal = signal('Carlos')

  constructor() { }

  get loggedUser() {
    return this.loggedUserSignal.asReadonly()
  }

  get loggedNameUser() {
    return this.loggedNameUserSignal.asReadonly()
  }
}
