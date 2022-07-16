import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from '../services/chat.service';
import { Chat } from '../interface/chat'; 
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
 
  chat$: Chat;

  constructor(private route: ActivatedRoute, public chatService: ChatService, private firestore: AngularFirestore) {
    this.chat$ = {
      message: '',
      chatID: '',
      channelID: ''
    };
   }

  ngOnInit(): void {
    
    // Aktuelle chat ID holen
    this.route.params.subscribe((params) => {
      this.chatID = params['id'];
      // console.log('ChatID: ', this.chatID)

      // this.chatService.loadCurrentChat(params['id']);

      this.chat$.chatID = this.chatID
    });


      this.firestore
        .collection('messages')
        // .doc(this.messageID)
        .valueChanges({idField: 'customIdName'})
        .subscribe((chat: any) => {
          
          this.allMessages = chat
          console.log('Message from Firestore: ', this.allMessages);
        });
    }  

  
  

  submit() {
    this.firestore
    .collection('messages')
    .add(this.chat$)
    .then( (message: any) => {
      // console.log('message', message.id)
      this.messageID = message.id
    });

    this.chat$.message = '';
  }

}
