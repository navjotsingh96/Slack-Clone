import { Component, Injectable, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from '../services/chat.service';
import { Chat } from '../interface/chat';
import { Auth, idToken } from '@angular/fire/auth';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../interface/user.class';
import { map } from 'rxjs/operators';


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
  constructor(private route: ActivatedRoute, public chatService: ChatService, private firestore: AngularFirestore,
    public authService: AuthenticationService) {

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
    console.log(this.chat$.user);;


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
          console.log(message.length);
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
    console.log('This. all', this.allMessages['customIdName']);

  }

  // this function check if the channel id and chat id same is then chat will be pushed in Array
  showChannelMessages(message) {
    for (let i = 0; i < message.length; i++) {
      const msg = message[i];
      if (!msg.channelID === this.channelID) {
        console.log('true');
        this.allMessages = []
      } else
        this.allMessages = (message);
    }
  }
  getAllUserFfromirebase() {
    this.firestore
      .collection('users')
      .valueChanges({ idField: 'user' })
      .subscribe((changes) => {
        this.users = changes;
        console.log('Changes fron User', this.users);

      })

  }
  // to send message to firestroe
  submit() {
    this.getId();
    this.firestore
      .collection(this.channelID)
      .add(this.chat$.toJSON())
      .then((message: any) => {
        console.log('Suceesful', message);
        // console.log('message', message.id)
        this.messageID = message.id
      }).catch((err) => {
        console.log('Error', err);

      })

    this.chat$.message = '';
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
        console.log('Message sucessfully deleted', done);
      }))
  }
}

