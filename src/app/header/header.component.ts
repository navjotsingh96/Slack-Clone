import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { ProfileImagesService } from '../profile-images.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    public authService: AuthenticationService,
    private router: Router,
    public profileImgs: ProfileImagesService
  ) { }


  ngOnInit(): void {
  }
  logout(){
    this.authService.logout().subscribe(() => {
      this.router.navigate(['login']);
      this.authService.loggedIn = true
    });
  }

  changeProfileImg(){

    console.log('change profile img');
  }
}
