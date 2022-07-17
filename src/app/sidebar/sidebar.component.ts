import { Component, Injectable, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { DialogAddChannelsComponent } from '../dialog-add-channels/dialog-add-channels.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Channel } from '../interface/channel';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
@Injectable({providedIn: 'root'})

export class SidebarComponent implements OnInit{

  Channel$: Channel;
  allChannels: any = [];
  
  constructor(public dialog: MatDialog, private firestore: AngularFirestore, private router: Router) { }

  ngOnInit(): void {
    this.firestore 
      .collection('channels')/* gespeicherte Daten aus firestore user collection werden geladen */
      .valueChanges({idField: 'customIdName'}) /* alle änderungen werden gespeichert / customIdName ID von jeder collection */
      .subscribe((changes: any) => {
        this.allChannels = changes; 
        console.log('All Channels: ', this.allChannels)
    
      })
     
  }

  openDialog() {
    this.dialog.open(DialogAddChannelsComponent);
  }
 

  }



