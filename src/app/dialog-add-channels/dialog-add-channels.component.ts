import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Channel } from '../interface/channel';


@Component({
  selector: 'app-dialog-add-channels',
  templateUrl: './dialog-add-channels.component.html',
  styleUrls: ['./dialog-add-channels.component.scss']
})

export class DialogAddChannelsComponent implements OnInit {

  Channel$: Channel;
  

  constructor(private firestore: AngularFirestore, private router: Router) {
    this.Channel$ = {
      channelName: '',
    };
   }

  ngOnInit(): void {
  }

  createChannel() {
    this.firestore
    .collection('channels')
    .add(this.Channel$)
    .then( (channel: any) => {
      this.router.navigateByUrl('/chat/' + channel.id)
    });

  }
}
