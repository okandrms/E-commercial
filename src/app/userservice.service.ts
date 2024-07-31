import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://127.0.0.1:8000/api/register'; // Backend URL for registration

  private loginSubject = new BehaviorSubject<string | null>(null);
  login$ = this.loginSubject.asObservable();

  async createUser(account: any): Promise<Response> {
    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(account)
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || 'Failed to create user');
      }

      return response;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  async login(credentials: { email: string, password: string }): Promise<any> {
    const loginUrl = 'http://127.0.0.1:8000/api/login';
    try {
      const response = await fetch(loginUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || 'Login failed');
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  }

  triggerAppComponent() {
    this.loginSubject.next("Login success");
  }
}
