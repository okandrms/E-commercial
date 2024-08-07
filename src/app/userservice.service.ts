import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://127.0.0.1:8000/api/register'; // Backend URL for registration

  private loginSubject = new BehaviorSubject<string | null>(null);
  login$ = this.loginSubject.asObservable();

  async createUser(account: any): Promise<any> {
    try {
      console.log('Sending request to:', this.apiUrl);
      console.log('Request method:', 'POST');
      console.log('Request headers:', {
        'Content-Type': 'application/json'
      });
      console.log('Request body:', JSON.stringify(account));

      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(account)
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);

      if (!response.ok) {
        const errorResponse = await response.json();
        console.error('Error response body:', errorResponse);
        throw new Error(errorResponse.message || 'Failed to create user');
      }

      const jsonResponse = await response.json();
      console.log('Response JSON:', jsonResponse);
      return jsonResponse;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }


  async login(credentials: { email: string, password: string }): Promise<Response> {
    const loginUrl = 'http://127.0.0.1:8000/api/login';
    try {
      const response = await fetch(loginUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      });

return response;
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  }


  triggerAppComponent() {
    this.loginSubject.next("Login success");
  }
}
