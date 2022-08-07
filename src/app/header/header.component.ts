import { Component, Injectable, Input, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { PageListComponent } from '../page-list/page-list.component';
import {MatDrawer, MatSidenav, MatSidenavModule} from '@angular/material/sidenav';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
@Injectable({ providedIn: 'root' })

export class HeaderComponent implements OnInit {
  drawer;
  @Input() inputSideNav: MatDrawer;
  @Input() responsvie: MatDrawer;
  
  constructor(
    public authService: AuthenticationService,
    private router: Router,
    public Sidnav : PageListComponent,
    public draw: MatSidenavModule
  ) { }


  ngOnInit(): void {
    console.log();
    
  }
  logout(){
    this.authService.logout().subscribe(() => {
    //  this.router.navigate(['login']);
      window.location.reload();
      this.authService.loggedIn = false;
    });
  }
  
  changeProfileImg(){
    
    console.log('change profile img');
  }
}
