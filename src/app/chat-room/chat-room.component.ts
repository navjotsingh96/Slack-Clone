import { Component, Injectable, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from '../services/chat.service';
import { Chat } from '../interface/chat';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../interface/user.class';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditMessagesComponent } from '../dialog-edit-messages/dialog-edit-messages.component';


@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss']
})
@Injectable({ providedIn: 'root' })

export class ChatRoomComponent implements OnInit {
  zeroMsg = true;
  allMessages = [];
  activeChannel;
  channelID: any;
  messageID: any;
  message;
  chat$: Chat = new Chat;
  user: User = new User()
  userIdtry;
  users;
  userID;
  constructor(private route: ActivatedRoute,
    public chatService: ChatService,
    private firestore: AngularFirestore,
    public authService: AuthenticationService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog) {

  }

  ngOnInit(): void {

    /**
     * Get currently ID from channel
     */
    this.route.paramMap.subscribe((paramMap) => {
      this.channelID = paramMap.get('id');
      this.chat$.channelID = this.channelID;
      this.getMessages();
      this.getChannels();
      this.allMessages = []; // when user click on another channel it array will be empty
      this.getAllUserFfromirebase();
    });

  }


  // get Channel from DB and to show as H1
  getChannels() {
    this.firestore
      .collection('channels')/* gespeicherte Daten aus firestore user collection werden geladen */
      .doc(this.channelID)
      .valueChanges({ idField: 'channelID' }) /* alle änderungen werden gespeichert / customIdName ID von jeder collection */
      .subscribe((changes: any) => {
        if (!changes.channelName) return
        this.activeChannel = changes;
      })

  }
  getId() {
    this.chat$.user = (<HTMLInputElement>document.getElementById("user-name")).value

  }
  getUserWithId() {
    this.allMessages.find((email => {
      this.userID = email.user

    }))
  }

  // to take messages from ChannelID
  getMessages() {
    this.firestore
      .collection(this.channelID)
      .valueChanges({ idField: 'customIdName' })
      .subscribe((message: any) => {
        for (let i = 0; i < message.length; i++) {
          const msg = message[i];
          if (message.length === 0) {
            this.zeroMsg = true
          }
          else this.zeroMsg = false
          if (!msg.channelID === this.channelID) {
            console.log('id from ', msg.channelID);
            this.allMessages = [];
          } else
            this.allMessages = message.sort((mess1: any, mess2: any) => { // neu nachrichen werden am Ende gezeigt
              return mess1.time - mess2.time;
            });


        }
      })
  }

  getAllUserFfromirebase() {
    this.firestore
      .collection('users')
      .valueChanges({ idField: 'user' })
      .subscribe((changes) => {
        this.users = changes;
      })

  }
  // to send message to firestroe
  submit() {
    if (!this.chat$.message) {
      this.enterMessageSnackBar()
    }
    if (this.chat$.message) {
      this.getId();
      this.firestore
        .collection(this.channelID)
        .add(this.chat$.toJSON())
        .then((message: any) => {
          this.messageID = message.id
        }).catch((err) => {
          console.log('Error', err);
        })

    } if (!this.chat$.message) {
      this.enterMessageSnackBar()
    }
  }
  deleteMesage(message) {
    console.log('MsgId', message);
    this.firestore
      .collection(this.channelID)
      .doc(message)
      .delete()
      .catch((error => {
        console.log('Somthing went wrong', error);
      }))
      .then((done => {

        this.openSnackBar();
      }))
  }
  saveMessage(message) {
    this.firestore
      .collection(this.channelID)
      .doc(message)
      .update(this.chat$.toJSON())
  }

  openDialog(messageID) {
    const dialogRef = this.dialog.open(DialogEditMessagesComponent)
    dialogRef.componentInstance.messageID = messageID;
    dialogRef.componentInstance.channelID = this.channelID;

  }
  openSnackBar() {
    this._snackBar.open('Message deleted', '', {
      duration: 3000
    });
  }
  enterMessageSnackBar() {
    this._snackBar.open('Please write something', '', {
      duration: 3000
    });
  }

}

