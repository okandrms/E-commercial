import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../userservice.service';
import { LocalStorageService } from '../local-storage.service';

// Component decorator to define the component metadata
@Component({
  selector: 'app-login', // Selector for the component
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, RouterLink], // Imported modules and components
  templateUrl: './login.component.html', // HTML template file
  styleUrls: ['./login.component.css'] // CSS style file
})
export class LoginComponent {
  // Form group for login form
  loginForm: FormGroup;

  // ToastrService instance for displaying notifications
  toaster: ToastrService;

  // Object to store login information
  lgn: any = {
    email: '',
    password: '',
  };

  // Constructor to inject necessary services and initialize form
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private localStorageService: LocalStorageService
  ) {
    // Inject ToastrService
    this.toaster = inject(ToastrService);

    // Initialize the login form with validation
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  // Method to handle the login process
  async login() {
    // Check if form is valid
    if (this.loginForm.invalid) {
      this.toaster.error('Empty fields');
      return;
    }

    // Check if the user is already logged in
    if (this.localStorageService.getLocalStorageValue('user')) {
      this.toaster.error('Already Logged In, please logout');
      return;
    }

    // Get form values
    const loginData = this.loginForm.value;
    console.log(loginData);

    try {
      // Call user service to perform login
      const response: Response = await this.userService.login(loginData);

      // Check the status of the response
      if (response.ok) {
        // Parse response data
        const data = await response.json();
        console.log(data);

        // Store user information in local storage
        this.localStorageService.setLocalStorageValue('user', data.data);
        // Display success message
        this.toaster.success('Login successful');
        this.userService.triggerAppComponent();
        // Navigate to the home route
        this.router.navigateByUrl('/home');
      } else {
        // Display error message for wrong username or password
        this.toaster.error('Wrong username or password');
      }
    } catch (error) {
      this.toaster.error('An error occurred');
    }
  }
}

