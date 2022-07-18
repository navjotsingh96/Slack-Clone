import { Component, Injectable, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { DialogAddChannelsComponent } from '../dialog-add-channels/dialog-add-channels.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Channel } from '../interface/channel';
import { AuthenticationService } from '../services/authentication.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
@Injectable({ providedIn: 'root' })

export class SidebarComponent implements OnInit {

  user$ = this.authService.currentUser$;
  channels: Channel[];
  allChannels: any = [];

  constructor(public dialog: MatDialog, private firestore: AngularFirestore, private router: Router,
    public authService: AuthenticationService) { }

  ngOnInit(): void {
    this.firestore
      .collection('channels')/* gespeicherte Daten aus firestore user collection werden geladen */
      .valueChanges({ idField: 'customIdName' }) /* alle änderungen werden gespeichert / customIdName ID von jeder collection */
      .subscribe((changes: any) => {
        this.allChannels = changes;
        console.log('All Channels: ', this.allChannels)

      })

  }

  openDialog() {
    this.dialog.open(DialogAddChannelsComponent);
  }
}



