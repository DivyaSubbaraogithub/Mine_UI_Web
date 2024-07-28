import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private registerSubject = new Subject<void>();
  registerEvent$ = this.registerSubject.asObservable();

  constructor() { }
  triggerRegister() {
    this.registerSubject.next();
  }
}
