import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../userservice.service';
import { LocalStorageService } from '../local-storage.service';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink], // Remove FormsModule (not needed for reactive forms)
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  toaster: ToastrService;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private localStorageService: LocalStorageService
  ) {
    this.toaster = inject(ToastrService);

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  async login() {
    if (this.loginForm.invalid) {
      this.toaster.error('Invalid username or password.');
      return;
    }

    if (this.localStorageService.getLocalStorageValue('user')) {
      this.toaster.error('You are already logged in. Please log out first.');
      return;
    }

    const loginData = this.loginForm.value;

    try {
      const response = await this.userService.login(loginData);

      if (response.ok) {
        const data = await response.json();
        this.localStorageService.setLocalStorageValue('user', data.data);
        this.toaster.success('You have successfully logged in!');
        this.userService.triggerAppComponent(); // Assuming this triggers a home component update
        this.router.navigateByUrl('/home');
      } else {
        this.toaster.error('Invalid username or password.');
      }
    } catch (error) {
      this.toaster.error('An error occurred.');
    }
  }
}

