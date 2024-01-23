import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
  
})
export class LocalStorageService {

  private localStorageSubject = new BehaviorSubject<string | null>(null);
  localStorage$ = this.localStorageSubject.asObservable();
  setLocalStorageValue(key: string, value: any): void {
    console.log(key, value); 
    const stringValue = JSON.stringify(value);
    localStorage.setItem(key, stringValue);
    this.localStorageSubject.next(stringValue); 
  }

  getLocalStorageValue(key: string): any {
    const stringValue = localStorage.getItem(key);
    return stringValue ? JSON.parse(stringValue??"") : null; 
  }

  subject = new Subject<any>();
}