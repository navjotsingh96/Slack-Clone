import { Component, HostListener, Injectable, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { DialogAddChannelsComponent } from '../dialog-add-channels/dialog-add-channels.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Channel } from '../interface/channel';
import { AuthenticationService } from '../services/authentication.service';
import { AsyncPipe } from '@angular/common';
import { DialogAddDmComponent } from '../dialog-add-dm/dialog-add-dm.component';
import { MatDrawer } from '@angular/material/sidenav';
import { SideNavService } from '../services/sidenav.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
@Injectable({ providedIn: 'root' })

export class SidebarComponent implements OnInit {

  allChannels: any = [];

  DM_channels: any = [];

  allUSers: any = [];
  allowedUsers: any = []
  public innerWidth: any;
  allDirectChannles;

  DM: boolean = false;
  @ViewChild('drawer') public sidenav: MatDrawer;
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = event?.path[0].innerWidth;
  }

  constructor(
    public dialog: MatDialog,
    private firestore: AngularFirestore,
    public authService: AuthenticationService,
    private sideNavService: SideNavService) { }

  ngOnInit(): void {
    this.sideNavService.sideNavToggleSubject.subscribe(() => {
      this.sidenav?.toggle();
    });
    this.loadChannels()
    this.loadUserFromDB();
    this.loadDirectChannelDB();
    //check screen size
    this.onResize(event)
  }

  //Load data form firestore for channels
  loadChannels() {
    this.firestore
      .collection('channels')
      .valueChanges({ idField: 'customIdName' })
      .subscribe((changes: any) => {
        this.allChannels = changes;
        console.log('All Channels: ', this.allChannels)
      })
  }

  //Load User data form firestore
  loadUserFromDB() {
    this.firestore
      .collection('users')
      .valueChanges({ idField: 'userId' })
      .subscribe((changes: any) => {
        this.allUSers = changes;
      });
  }

  //To Load Channel and show only to correct User
  loadDirectChannelDB() {
    this.firestore
      .collection('directMessage')
      .valueChanges({ idField: 'dmID' })
      .subscribe((DM) => {
        this.allDirectChannles = DM;
        this.allDirectChannles.forEach(channels => {
          channels.users.forEach(user => {
            if (user.userId === this.authService.auth.currentUser.uid) {
              this.allowedUsers.push(channels);
              if (!this.allUSers.name) {
                this.DM_channels.push(channels);
              }
              console.log('Direct Channel', this.DM_channels);
            }
          });
        });
      })
  }

  openDialog() {
    this.dialog.open(DialogAddChannelsComponent);
  }

  OpenAddDmChannel() {
    this.dialog.open(DialogAddDmComponent);
  }

  //to show or hide Sidenav on Responsive 
  toogelSideNav() {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth <= 766) {
      this.sidenav.toggle();
    }
  }


  /**
   * Checking that the current user has direct message, if yes show it
   */
  // filteUser() {
  //   this.DM_channels.forEach((DM: any) => {  // Loop all direct message channels

  //     DM.users.forEach((user: any) => { // Loop all users in direct message channels
  //       if (user.email ==  this.authService.auth.currentUser.email) {
  //         this.DM = true;
  //         console.log('all dm channels for me (filteUser):', this.DM_channels)
  //       }
  //     });

  //   });
  // }

  logout() {
    this.authService.logout().subscribe(() => {
      //  this.router.navigate(['login']);
      window.location.reload();
      this.authService.loggedIn = false;
    });
  }
}



