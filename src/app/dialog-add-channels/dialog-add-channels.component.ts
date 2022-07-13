import { Component, Injectable, Input, OnInit } from '@angular/core';
import { AppRoutingModule } from '../app-routing.module';
import { AppModule } from '../app.module';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-dialog-add-channels',
  templateUrl: './dialog-add-channels.component.html',
  styleUrls: ['./dialog-add-channels.component.scss']
})


export class DialogAddChannelsComponent implements OnInit {
  @Input() channelName;
  @Input()  channelDescripton;
  constructor() { }

  ngOnInit(): void {
  }
  createChannel() {
 

  }
}
