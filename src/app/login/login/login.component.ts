import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });

  constructor (
    private authService: AuthenticationService,
    private router: Router,
    private toast: HotToastService
  ) { }
<<<<<<< HEAD
    
=======



>>>>>>> 89e6d630084fe34c04caecd8660f3c950073a7a1
  ngOnInit(): void {
  }

  get email() {  // getter for email field
    return this.loginForm.get('email');
  }
  get password() {    // getter for password field
    return this.loginForm.get('password');

  }

  submit() {
    if (!this.loginForm.valid) {    
      return;
    }
    const { email, password } = this.loginForm.value;   // get the values from the form
    this.authService.login(email, password).pipe(   // login user
      this.toast.observe({
        success: 'Login Successful',   // success message
        loading: 'Logging in...',       // loading message
        error: 'Login Failed'       // error message
      })
    ).subscribe(() => {              
      this.router.navigate(['home']);
    });
  }
}
