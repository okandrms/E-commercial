import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RouterLink } from '@angular/router';



@Component({
  selector: 'app-forgotpassword',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, RouterLink],
  templateUrl: './forgotpassword.component.html',
  styleUrl: './forgotpassword.component.css'
})


export class ForgotpasswordComponent {
  account = {
    email: ''
  };

  resetPassword() {
    // Logic for resetting password
    console.log('Password reset for', this.account.email);
  }
}
