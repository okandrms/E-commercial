import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-resetpassword',
  standalone: true,
  imports: [ FormsModule], // Imported modules and components
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css'],

})
export class ResetpasswordComponent {
  account: any = {
    email: '',
    newPassword: '',
    confirmPassword: ''
  };
  token: string;

  constructor(private route: ActivatedRoute, private http: HttpClient) {
    this.token = this.route.snapshot.queryParams['token'];
  }

  changePassword() {
    if (this.account.newPassword === this.account.confirmPassword) {
      this.http.post('http://localhost:8000/api/password/reset', {
        email: this.account.email,
        token: this.token,
        password: this.account.newPassword,
        password_confirmation: this.account.confirmPassword
      }).subscribe(response => {
        console.log(response);
      }, error => {
        console.error(error);
      });
    } else {
      console.error('Passwords do not match');
    }
  }
}
