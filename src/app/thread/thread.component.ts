import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { Chat } from '../interface/chat';

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.scss']
})
export class ThreadComponent implements OnInit {
  messageID;
  threadmsg;
  chat$: Chat = new Chat;
  constructor(private firestore: AngularFirestore, private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((parmsMap => {
      this.messageID = parmsMap.get('id');
      console.log('I got ID of Message', this.messageID);
    }))
    this.getThreadMsg();
  }

  getThreadMsg() {
    this.threadmsg;
    this.firestore
      .collection('threads')
      .doc(this.messageID)
      .collection(this.messageID)
      .valueChanges({ idFeld: 'Id' })
      .subscribe((thread => {
        this.threadmsg = thread;
        console.log('Threads', thread);

      }))
  }
  submit() {
    this.firestore
      .collection('threads')
      .doc(this.messageID)
      .collection(this.messageID)
      .add(this.chat$.toJSON())
      .then((added => {
        console.log('Added', added);
      }))
  }
}
