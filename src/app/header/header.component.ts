import { Component, Injectable, Input, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { PageListComponent } from '../page-list/page-list.component';
import {MatDrawer, MatDrawerContainer, MatSidenav, MatSidenavModule} from '@angular/material/sidenav';
import { SideNavService } from '../services/sidenav.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
@Injectable({ providedIn: 'root' })

export class HeaderComponent implements OnInit {
  drawer;
  @Input() inputSideNav: MatDrawer;
  @Input() responsvie;
  
  constructor(
    public authService: AuthenticationService,
    private router: Router,
    public Sidnav : PageListComponent,
    public draw: SideNavService
  ) { }


  ngOnInit(): void {
    console.log();
    
  }
  logout(){
    this.authService.logout().subscribe(() => {
     this.router.navigate(['login']);
      window.location.reload();
      this.authService.loggedIn = false;
    });
  }
  closeMenu(){
    this.draw.toggle();
  }
  
  changeProfileImg(){
    
    console.log('change profile img');
  }
}
