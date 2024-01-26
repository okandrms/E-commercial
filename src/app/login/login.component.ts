// Import necessary modules and components from Angular
import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../userservice.service';
import { LocalStorageService } from '../local-storage.service';

// Component decorator to define the component metadata
@Component({
  selector: 'app-login', // Selector for the component
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, RouterLink], // Imported modules and components
  templateUrl: './login.component.html', // HTML template file
  styleUrl: './login.component.css' // CSS style file
})
export class LoginComponent {
  // Object to store login information
  loginObj: any = {
    username: '',
    password: '',
    loginForm: FormGroup, Validators, FormBuilder, // Define a FormGroup for the login form;
  };

  // Object to store account information
  account: any = {
    name: '',
    surname: '',
    email: '',
    password: '',
  };

  // Object to store login information
  lgn: any = {
    email: '',
    password: '',
  };

  // ToastrService instance for displaying notifications
  toaster: any;

  // Constructor to inject necessary services and initialize form
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private localStorageService: LocalStorageService
  ) {
    // Initialize login form with validation rules
    this.loginObj.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

    // Inject ToastrService
    this.toaster = inject(ToastrService);
  }

  // Method to create a new user account
  createAccount() {
    //if you already logged in toaster already logged in else do the following
    if(this.localStorageService.getLocalStorageValue('user')){
      this.toaster.error('Logged in, please logout to create a new account');
      return;
    }
    // check status of response
    if(this.account.name == '' || this.account.surname == '' || this.account.email == '' || this.account.password == ''){
      this.toaster.error('Empty fields');
      return;
    }
    
    // Call user service to create a new user
    this.userService.createUser(this.account);
    // Display success message
    this.toaster.success('Account created successfully');
    
    
    // Empty account fields
    this.account.name = '';
    this.account.surname = '';
    this.account.email = '';
    this.account.password = '';
  }

  // Method to handle the login process
  async login() {
    // Call user service to perform login
    let response: any = await this.userService.login(this.lgn);

    //if you already logged in toaster already logged in else do the following
    if(this.localStorageService.getLocalStorageValue('user')){
      this.toaster.error('Already Logged In, please logout');
      return;
    }
    
    //if login fields are empty and user pushed button to login toaster empty fields else do the following
    if(this.lgn.email == '' || this.lgn.password == ''){
      this.toaster.error('Empty fields');
      return;
    }
    


    // Parse response data
    let data = await response.json();
    console.log(data);
    

    // Check the status of the response
     if (response.status == 200) {
      // Store user information in local storage
      this.localStorageService.setLocalStorageValue('user', data.data);
      // Display success message
      this.toaster.success('Login successful');
      // Navigate to the home route
      this.router.navigateByUrl('/home');
      
    } else {
      // Display error message for wrong username or password
      this.toaster.error('Wrong username or password');
    }
  }

}






  

