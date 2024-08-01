import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../userservice.service';
import { LocalStorageService } from '../local-storage.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private localStorageService: LocalStorageService,
    private toastr: ToastrService  // Correctly inject ToastrService through constructor
  ) {
    // Initialize the form with validators
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      password_confirmation: ['', Validators.required]
    });
  }

  // Function to handle form submission
  async createAccount() {
    if (this.localStorageService.getLocalStorageValue('user')) {
      this.toastr.error('Logged in, please logout to create a new account');
      return;
    }

    if (this.registerForm.invalid) {
      this.toastr.error('Please fill all fields correctly');
      return;
    }

    const { name, surname, email, password, password_confirmation } = this.registerForm.value;

    if (password !== password_confirmation) {
      this.toastr.error('Passwords do not match');
      return;
    }

    // Call user service to create a new user
    try {
      console.log('Creating user with:', { name, surname, email, password, password_confirmation });
      const response = await this.userService.createUser({ name, surname, email, password, password_confirmation });



      if (response.id) {

        console.log('User created successfully:', response);
        this.toastr.success('Account created successfully');
        this.registerForm.reset();
        this.router.navigate(['/login']);
      } else {

        console.error('Error response:', response);
        this.toastr.error(response || 'Failed to create account');
      }
    } catch (error) {
      console.error('Failed to create account:', error);
      this.toastr.error('Failed to create account');
    }
  }
}
