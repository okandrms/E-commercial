import { Component, inject } from '@angular/core';
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
  // Define a FormGroup for the registration form
  registerForm: FormGroup;
  toaster: ToastrService;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private localStorageService: LocalStorageService
  ) {
    this.toaster = inject(ToastrService);

    // Initialize the form with validators
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      password_confirmation: ['', Validators.required]
    });
  }

  account: any = { name: '', surname: '', email: '', password: '', };

  // Function to handle form submission
  async createAccount() {
    if (this.localStorageService.getLocalStorageValue('user')) {
      this.toaster.error('Logged in, please logout to create a new account');
      return;
    }

    if (this.registerForm.invalid) {
      this.toaster.error('Please fill all fields correctly');
      return;
    }

    // Extract form values
    const { name, surname, email, password, password_confirmation } = this.registerForm.value;

    if (password !== password_confirmation) {
      this.toaster.error('Passwords do not match');
      return;
    }

    // Call user service to create a new user
    try {
      const response = await this.userService.createUser({ name, surname, email, password, password_confirmation });
      if (response.ok) {
        this.toaster.success('Account created successfully');
        this.registerForm.reset();
        this.router.navigate(['/login']); // Redirect to login page or another page
      } else {
        const errorResponse = await response.json();
        this.toaster.error(errorResponse.message || 'Failed to create account');
      }
    } catch (error) {
      this.toaster.error('Failed to create account');
      console.error(error);
    }
  }
}
