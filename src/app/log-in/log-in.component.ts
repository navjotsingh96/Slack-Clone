import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { HotToastService } from '@ngneat/hot-toast';
import { getAuth, user } from '@angular/fire/auth';
import { concatMap, map } from 'rxjs';
import { User } from 'src/app/interface/user.class';
import { ChatRoomComponent } from 'src/app/chat-room/chat-room.component';
import { ProfileComponent } from '../profile/profile.component';
import { ImageUploadService } from '../services/image-upload.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})

export class LoginComponent implements OnInit {

  userKey:any ='';
  user: User;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private toast: HotToastService,
    private chat: ChatRoomComponent,
    private profile : ProfileComponent,
    private imageUploadService: ImageUploadService,

  ) { }



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


    ).subscribe((user) => {
      this.authService.loggedIn = true
      console.log('user Logged in', user.user.uid);
      this.userKey = user.user.uid;
      this.router.navigate(['']);
      this.uploadImage(user);
    });
  }
  uploadImage(user) {
  /*   this.imageUploadService.uploadImage(event.target.files[0], `img/${user.key}`).pipe(
        this.toast.observe({
          loading: 'Uploading...',
          success: 'Upload Successfully',
          error: 'Upload Failed'
        }
        ), 
        concatMap((photoUrl)=> this.authService.updateProfileData({photoUrl}) )
        ).subscribe((img=>{
          console.log('Img', img);
          
        })); */


}
}

