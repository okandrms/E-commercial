// Import necessary Angular modules and third-party libraries
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Subject } from 'rxjs';

// Injectable decorator to make the service available for dependency injection
@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  clearLocalStorage(): void {
    localStorage.clear();
    this.localStorageSubject.next(null);
  }
 
  // BehaviorSubject to emit changes in the localStorage
  private localStorageSubject = new BehaviorSubject<string | null>(null);
  // Observable to subscribe to changes in the localStorage
  localStorage$ = this.localStorageSubject.asObservable();

  // Method to set a value in the localStorage
  setLocalStorageValue(key: string, value: any): void {
    console.log(key, value); 
    // Convert the value to a JSON string
    const stringValue = JSON.stringify(value);
    // Set the value in the localStorage
    localStorage.setItem(key, stringValue);
    // Emit the updated localStorage value
    this.localStorageSubject.next(stringValue);
  }

  // Method to get a value from the localStorage
  getLocalStorageValue(key: string): any {
    // Retrieve the JSON string from the localStorage
    const stringValue = localStorage.getItem(key);
    // Parse the JSON string and return the value
    return stringValue ? JSON.parse(stringValue??"") : null; 
  }

  // Subject to facilitate communication between components
  subject = new Subject<any>();
}