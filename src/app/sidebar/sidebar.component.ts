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
        // console.log('All Channels: ', this.allChannels)
      })


    /**
     * Load data form firestore for direct message
     */

    this.loadUserFromDB()



  }
  loadUserFromDB() {
    this.firestore
      .collection('directMessage')
      .valueChanges({ idField: 'dmID' })
      .subscribe((DM) => {
        let userid = DM[0]['users']['userid']
        for (let i = 0; i < userid.length; i++) {
          const element = userid[i];
          console.log(element);
          
        }
        console.log(DM[0]['users']['userid']);

        /*      console.log('DK',DM[0]['users']);
             if(DM['users'])
             this.DM_channels = DM;
             DM.forEach((msg: any) => {  // Loop all direct message channels
           
                msg.users.forEach((user: any) => { // Loop all users ind direct message channels
                 if (user.email ==  this.authService.auth.currentUser.email) {
                   // this.DM_channels = DM;
                   this.DM_channels.push(msg);
                   console.log('all dm channels for me:', this.DM_channels)
                 }
               });
               
             }); */
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

}



