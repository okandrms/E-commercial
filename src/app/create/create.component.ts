import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../userservice.service';
import { LocalStorageService } from '../local-storage.service';



@Component({
  selector: 'app-create',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, RouterLink],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {
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

    // Inject ToastrService
    this.toaster = inject(ToastrService);
  }







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
}
