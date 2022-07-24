import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { concatMap , Observable} from 'rxjs';
import { User } from '../interface/user.class';
import { AuthenticationService } from '../services/authentication.service';
import { ImageUploadService } from '../services/image-upload.service';
import { HotToastService } from '@ngneat/hot-toast';
import { LoginComponent } from '../log-in/log-in.component';
import { user } from '@angular/fire/auth';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  
  user$ = this.authService.currentUser$;
  constructor(
    private authService: AuthenticationService,
    public storage: AngularFireStorage,
    private imageUploadService: ImageUploadService,
    private toast: HotToastService,
    public login : LoginComponent
  ) { }


  ngOnInit(): void {
  }

  uploadImage() {
    this.login.uploadImage(user)
  
  }
}

