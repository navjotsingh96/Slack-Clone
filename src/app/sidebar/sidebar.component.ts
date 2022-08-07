import { Component, Injectable, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { DialogAddChannelsComponent } from '../dialog-add-channels/dialog-add-channels.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Channel } from '../interface/channel';
import { AuthenticationService } from '../services/authentication.service';
import { AsyncPipe } from '@angular/common';
import { DialogAddDmComponent } from '../dialog-add-dm/dialog-add-dm.component';

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
  DM: boolean = false;
  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];
  constructor(
    public dialog: MatDialog,
    private firestore: AngularFirestore,
    public authService: AuthenticationService) { }

  ngOnInit(): void {

    /**
     * Load data form firestore for channels
     */
    this.firestore
      .collection('channels')
      .valueChanges({ idField: 'customIdName' })
      .subscribe((changes: any) => {
        this.allChannels = changes;
        console.log('All Channels: ', this.allChannels)
      })

    this.loadUserFromDB();
    /**
     * Load data form firestore for direct message
     */

    this.loadDirectChannelDB();

    

  }

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
          DM.forEach(channels => {
            channels['users'].forEach(user => {
              if (user.userId == this.authService.auth.currentUser.uid) {
                this.DM_channels.push(channels);
                console.log(channels['name']);
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
  logout(){
    this.authService.logout().subscribe(() => {
    //  this.router.navigate(['login']);
      window.location.reload();
      this.authService.loggedIn = false;
    });
  }
}



