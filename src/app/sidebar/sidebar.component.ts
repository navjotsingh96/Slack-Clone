import { Component, Injectable, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { DialogAddChannelsComponent } from '../dialog-add-channels/dialog-add-channels.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
@Injectable({providedIn: 'root'})

export class SidebarComponent implements OnInit{
  @Input() channelName: any;
  @Input() channelDescripton: any;
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }
  openDialog() {
    this.dialog.open(DialogAddChannelsComponent);
  }
}


