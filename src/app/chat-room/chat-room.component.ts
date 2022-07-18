import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from '../services/chat.service';
import { Chat, ChatToJSON } from '../interface/chat';
import { idToken } from '@angular/fire/auth';
import { AuthenticationService } from '../services/authentication.service';


@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss']
})
export class ChatRoomComponent implements OnInit {

  allMessages = [];
  activeChannel;
  channelID: any;
  messageID: any;
  message;
  chat$: Chat;
  chatsTry = new ChatToJSON()

  constructor(private route: ActivatedRoute, public chatService: ChatService, private firestore: AngularFirestore,
    public authService: AuthenticationService) {
    this.chat$ = {
      message: '',
      chatID: '',
      channelID: ''
    };
  }

  ngOnInit(): void {
    // Aktuelle chat ID holen
    this.route.paramMap.subscribe((paramMap) => {
      this.channelID = paramMap.get('id');
      this.chat$.channelID = this.channelID;
      console.log('got id', this.channelID);
      this.getMessages();
      this.getChannels();
      this.allMessages =['No msesssages'];
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
  // to take messages from ChannelID
  getMessages() {
    this.firestore
      .collection(this.channelID)
      .valueChanges()
      .subscribe((message: any) => {
        for (let i = 0; i < message.length; i++) {
          const msg = message[i];
          if (!msg.channelID === this.channelID) {
            console.log('id from ',msg.channelID);
            this.allMessages = ['No msesssages']
    
          } else
            this.allMessages = message;
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

  // to send message to firestroe
  submit() {
    this.firestore
      .collection(this.channelID)
      .add(this.chat$)
      .then((message: any) => {
        console.log('Suceesful', message);
        // console.log('message', message.id)
        this.messageID = message.id
      }).catch((err) => {
        console.log('Error', err);

      })
    this.chat$.message = '';
  }
}

