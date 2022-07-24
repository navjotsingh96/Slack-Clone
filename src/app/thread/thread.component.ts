import { Component, Injectable, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatRoomComponent } from '../chat-room/chat-room.component';
import { Chat } from '../interface/chat';
import { AuthenticationService } from '../services/authentication.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditMessagesComponent } from '../dialog-edit-messages/dialog-edit-messages.component';

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.scss']
})
@Injectable({ providedIn: 'root' })

export class ThreadComponent implements OnInit {
  messageID;
  threadmsg;
  chat$: Chat = new Chat;
  userID;
  channelID;
  threadHeading;
  constructor(private firestore: AngularFirestore, private router: Router,
    private route: ActivatedRoute,
    public authService: AuthenticationService,
    public chat: ChatRoomComponent,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((parmsMap => {
      this.messageID = parmsMap.get('id');
      this.chat$.user;
    }))
    this.channelID = this.router.url.split('/')[2];
    console.log('I got ID of Message', this.channelID)
    this.getThreadMsg();
    this.getmsg()
    console.log('THread messag id', this.messageID);
    
  }

  getmsg() {
    this.firestore
      .collection(this.channelID)
      .doc(this.messageID)
      .valueChanges()
      .subscribe((msg => {
        this.threadHeading = msg;
        console.log((this.threadHeading));

      }))

  }

  getThreadMsg() {
    this.threadmsg;
    this.firestore
      .collection('threads')
      .doc(this.messageID)
      .collection(this.messageID)
      .valueChanges({ idField: 'customIdName' })
      .subscribe((thread => {
        this.threadmsg = thread;
        console.log('Threads', thread);
        this.threadmsg = thread.sort((mess1: any, mess2: any) => { // neu nachrichen werden am Ende gezeigt
          return mess1.time - mess2.time;
        });

      }))
  }
  getId() {
    this.chat$.user = (<HTMLInputElement>document.getElementById("user-name")).value
    console.log(this.chat$.user);
  }
  submit() {
    this.getId();
    this.firestore
      .collection('threads')
      .doc(this.messageID)
      .collection(this.messageID)
      .add(this.chat$.toJSON())
      .then((added => {
        console.log('Added', added);
      }))
  }
  deleteThreadMsg(idofThread: any) {
    console.log('Thread id', idofThread);
    this.firestore
      .collection('threads')
      .doc(this.messageID)
      .collection(this.messageID)
      .doc(idofThread)
      .delete()
      .catch((error => {
        console.log(error);
      }))
      .then((done => {
        console.log('Done', done);
        this.openSnackBar()
      }))

  }
  openSnackBar() {
   this._snackBar.open('Message deleted','', {
    duration: 3000
  });
  }
  openDialog(messageID) {
    const dialogRef = this.dialog.open(DialogEditMessagesComponent)
    dialogRef.componentInstance.threadMessageID = messageID;
    dialogRef.componentInstance.messageID = this.messageID;
    console.log('from thrread',messageID);
  }
}
