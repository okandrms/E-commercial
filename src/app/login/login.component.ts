import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../userservice.service'; 
import { LocalStorageService } from '../local-storage.service';

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

account : any ={
  name: "",
  surname: "",
  email: "",
  password: "" 
};

lgn : any = {  
  email: "", 
  password: "" 
}; 

  toaster: any;
constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService,private localStorageService: LocalStorageService) {

  this.loginObj.loginForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });
  this.toaster = inject(ToastrService);
}
onLogin() {
  console.log(this.loginObj.loginForm.controls['username'].value);
  console.log(this.loginObj.loginForm.controls['password'].value);
  
  if(this.loginObj.loginForm.controls['username'].value.toLowerCase() == "admin" && 
      this.loginObj.loginForm.controls['password'].value.toLowerCase() == "3344") {
      this.toaster.success("Login successful");
      this.router.navigateByUrl('/home');
  } else{
      this.toaster.error("Wrong username or password")
  }
  }

  createAccount() {
    
    this.userService.createUser(this.account);
    this.toaster.success("Account created");
  
  }

  async login() { 

    let response : any = await this.userService.login(this.lgn); 
    // Add user informations to local storage.  
    let data = await response.json();
    console.log(data);
 
    if(response.status == 200) {
      this.localStorageService.setLocalStorageValue('user',data.data);
      this.toaster.success("Login successful");
      this.router.navigateByUrl('/home');
    } else {
      this.toaster.error("Wrong username or password")
    }
    }
   
  }





  

