import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
@Injectable({
  providedIn: 'root',
})
export class DataService {
  invitylist: any[];
  private messageSource = new BehaviorSubject<any>('default message');
  // tslint:disable-next-line:member-ordering
  currentMessage = this.messageSource.asObservable();

  constructor() {}
  // code changing messages

  changeMessage(message: any) {
    this.messageSource.next(message);
  }

  // code for changing array of objects
}
