// Import necessary modules and components from Angular
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../userservice.service';
import { LocalStorageService } from '../local-storage.service';

@Component({
  selector: 'app-login', // Selector for the component
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, RouterLink], // Imported modules and components
  templateUrl: './login.component.html', // HTML template file
  styleUrls: ['./login.component.css'] // CSS style file
})
export class LoginComponent implements OnInit {
[x: string]: any;
  // Form groups for the forms
  registerForm!: FormGroup;
  loginForm!: FormGroup;

  // ToastrService instance for displaying notifications
  toaster: ToastrService;

  lgn: any = {

    email: '',
    password: '',

  };

  // Object to store account information
  account: any = {
    name: '',
    surname: '',
    email: '',
    password: '',

  };

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private localStorageService: LocalStorageService
  ) {
    this.toaster = inject(ToastrService);
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  createAccount() {
    if (this.localStorageService.getLocalStorageValue('user')) {
      this.toaster.error('Logged in, please logout to create a new account');
      return;
    }

    if (this.registerForm.invalid) {
      this.toaster.error('Please fill all the fields correctly');
      return;
    }

    this.userService.createUser(this.registerForm.value).then(() => {
      this.toaster.success('Account created successfully');
      this.registerForm.reset();
    }).catch(error => {
      this.toaster.error('Error creating account: ' + error.message);
    });
  }

  async login() {
    if (this.loginForm.invalid) {
      this.toaster.error('Empty fields');
      return;
    }

    if (this.localStorageService.getLocalStorageValue('user')) {
      this.toaster.error('Already Logged In, please logout');
      return;
    }

    let response = await this.userService.login(this.loginForm.value);
    let data = await response.json();

    if (response.status === 200) {
      this.localStorageService.setLocalStorageValue('user', data.data);
      this.toaster.success('Login successful');
      this.userService.triggerAppComponent();
      this.router.navigateByUrl('/home');
    } else {
      this.toaster.error('Wrong username or password');
    }
  }
}
