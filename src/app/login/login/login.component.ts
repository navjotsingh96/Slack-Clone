import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('' ,[Validators.required, Validators.email]),
    password: new FormControl('' , Validators.required)
  });
  constructor() { }

  ngOnInit(): void {
  }

  get email(){
    return this.loginForm.get('email');
  }
}
