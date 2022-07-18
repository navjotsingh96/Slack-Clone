import { Component, Injectable, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from '../services/chat.service';
import { Chat } from '../interface/chat';
import { Auth, idToken } from '@angular/fire/auth';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../interface/user.class';


@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss']
})
@Injectable({ providedIn: 'root' })

export class ChatRoomComponent implements OnInit {

  allMessages = [];
  activeChannel;
  channelID: any;
  messageID: any;
  message;
  chat$: Chat = new Chat;
  user: User = new User()
  userIdtry;
  users;
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
      console.log('got id', this.channelID);
      this.getMessages();
      this.getChannels();
      this.allMessages = ['No msesssages']; // when user click on another channel it array will be empty

      this.getAllUserFfromirebase();
      console.log('new', this.userIdtry);
      this.getId()
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
    this.userIdtry = (<HTMLInputElement>document.getElementById("uid")).value;
    return  this.chat$.user = (<HTMLInputElement>document.getElementById("uid")).value;
    return console.log('from func', this.userIdtry);

  }
  // to take messages from ChannelID
  getMessages() {
    this.firestore
      .collection(this.channelID)
      .valueChanges()
      .subscribe((message: any) => {
        for (let i = 0; i < message.length; i++) {
          const msg = message[i];
          if (!msg.channelID === this.channelID) {
            console.log('id from ', msg.channelID);
            this.allMessages = ['No msesssages']
          } else
            this.allMessages = message.sort((mess1: any, mess2: any) => { // neu nachrichen werden am Ende gezeigt
              return mess1.time - mess2.time;
            });
        }
      })
    console.log('This. all', this.allMessages);

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
   checkUser(){
    return 
    }


  // to send message to firestroe
  submit() {
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
  async getUserfromFirebase() {
    console.log(this.authService.currentUser$)
  }
}

