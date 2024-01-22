import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, RouterLink,],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
loginObj: any = {
  username: '',
  password: '',
  loginForm: FormGroup, Validators, FormBuilder // Define a FormGroup for the login form;
};
constructor(private formBuilder: FormBuilder, private router: Router) {

  this.loginObj.loginForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });
  
}
onLogin() {
  
  if(this.loginObj.username.toLowerCase() == "admin" && this.loginObj.password.toLowerCase() == "3344") {
    this.router.navigateByUrl('/home');
  } else{
    alert("Wrong username or password")
  }
}



 }


  

