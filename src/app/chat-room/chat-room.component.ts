import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from '../services/chat.service';
import { Chat } from '../interface/chat';
import { idToken } from '@angular/fire/auth';
import { AuthenticationService } from '../services/authentication.service';

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
  // chatsTry = new ChatToJSON()

  constructor(
    private route: ActivatedRoute, 
    public chatService: ChatService, 
    private firestore: AngularFirestore, 
    public authService: AuthenticationService,) {
    this.chat$ = {
      message: '',
      chatID: '',
      channelID: ''
    };
  }

  ngOnInit(): void {
    
    /**
     * Get currently ID from channel
     */
    this.route.paramMap.subscribe((paramMap) => {
      this.chatID = paramMap.get('id');
      this.chat$.chatID = this.chatID;
      console.log('got id', this.chatID);
      this.getMessages();
    });
    
  }


/**
 * Take message as object from Firebase
 */
  getMessages() {
    this.firestore
      .collection(this.chatID)
      .valueChanges()
      .subscribe((message) => {
        console.log('Messages', message);
        if (message[0]['chatID'] === this.chatID) {
          this.allMessages = []
          this.showChannelMessages(message)
        }
      })
    console.log('All messages', this.allMessages);

  }


/**
 * This function check if the channel ID and chat ID same is then chat will be pushed in Array
 * @param {object} message - chat message and ID 
 */
  showChannelMessages(message) {
    message.forEach(object => {
      if (object.chatID === this.chatID) {
        this.allMessages.push(object);
      }
    });
  }


/**
 * Send input from textarea to Firebasse as a object
 */
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

