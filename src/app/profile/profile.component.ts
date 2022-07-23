import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { concatMap , Observable} from 'rxjs';
import { User } from '../interface/user.class';
import { AuthenticationService } from '../services/authentication.service';
import { ImageUploadService } from '../services/image-upload.service';
import { HotToastService } from '@ngneat/hot-toast';
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
  ) { }


  ngOnInit(): void {
  }

  uploadImage(event: any, user: User) {
    this.imageUploadService.uploadImage(event.target.files[0], `img/${user.key}`).pipe(
        this.toast.observe({
          loading: 'Uploading...',
          success: 'Upload Successfully',
          error: 'Upload Failed'
        }
        ), 
        concatMap((photoUrl)=> this.authService.updateProfileData({photoUrl}) )
        ).subscribe();

  }
}

