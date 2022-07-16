import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from '../services/chat.service';
import { Chat, ChatToJSON } from '../interface/chat';
import { idToken } from '@angular/fire/auth';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss']
})
export class ChatRoomComponent implements OnInit {

  allMessages = [];

  chatID: any;
  messageID: any;
  channelID;
  message;
  chat$: Chat;
  chatsTry = new ChatToJSON()

  constructor(private route: ActivatedRoute, public chatService: ChatService, private firestore: AngularFirestore) {
    this.chat$ = {
      message: '',
      chatID: '',
      channelID: ''
    };
  }

  ngOnInit(): void {
    // Aktuelle chat ID holen
    this.route.paramMap.subscribe((paramMap) => {
      this.chatID = paramMap.get('id');

      this.chat$.chatID = this.chatID;
      console.log('got id', this.chatID);
      this.getMessages();
    });
  }

  getMessages() {
    this.firestore
      .collection(this.chatID)
      .valueChanges()
      .subscribe((message) => {
        console.log('Messages', message);
        /*  this.showChannelMessages(message) */
        this.allMessages.push(message);
        if (message[0]['chatID'] === this.chatID) {
         this.showChannelMessages(message)
        }
      })
    this.allMessages = []
    console.log('This. all', this.allMessages);

  }

  showChannelMessages(message) {
    message.forEach(ID => {
      if (ID.chatID === this.chatID) {
        this.allMessages.push(ID);
        console.log('fromfunction', ID);
      }
    });


  }

  submit() {
    this.firestore
      .collection(this.chatID)
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

