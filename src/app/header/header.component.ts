import { Component, Injectable, Input, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { PageListComponent } from '../page-list/page-list.component';
import { MatDrawer, MatDrawerContainer, MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
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
    public Sidnav: PageListComponent,
    public draw: SideNavService
  ) { }


  ngOnInit(): void {

  }

  logout() {
    this.authService.logout();
    this.authService.loggedIn = false;
    window.location.reload();
    this.router.navigate(['login']);

  }
  closeMenu() {
    this.draw.toggle();
  }

  changeProfileImg() {

  }

  // delete account form Firebase 
  deleteAccount() {
    this.authService.deleteUser();
    setTimeout(() => {
      window.location.reload();
      this.authService.loggedIn = false;

      this.router.navigate(['login']);

    }, 3000);

  }
}
