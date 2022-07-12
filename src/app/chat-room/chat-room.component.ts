import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss']
})
export class ChatRoomComponent implements OnInit {
  messageInput:any;
  constructor() { }
input:any;
  ngOnInit(): void {
  }
  msgValue(){
    console.log(this.messageInput);
    this.input = (this.messageInput);
    console.log(this.input.split(''));
    
    
  }
}
