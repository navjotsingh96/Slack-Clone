import { Component, Injectable, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-dialog-edit-messages',
  templateUrl: './dialog-edit-messages.component.html',
  styleUrls: ['./dialog-edit-messages.component.scss']
})
@Injectable({ providedIn: 'root' })

export class DialogEditMessagesComponent implements OnInit {
  value:any;
  messageID: any;
  channelID: any;
  time:any;
  constructor(private firestore: AngularFirestore,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    console.log('ID from', this.messageID);
    console.log('ID from', this.channelID);
    this.getMsg();

  }
  // get Messages from Channel and value
  getMsg(){
    this.firestore
      .collection(this.channelID)
      .doc(this.messageID)
      .valueChanges()
      .subscribe((message => {
        this.value = message['message'];
      }));
  }

  //update changes
  updateMessage() {
    this.firestore
      .collection(this.channelID)
      .doc(this.messageID)
      .update({message: this.value}) // to update only Message string
      .then((done => {
       this.openSnackBar();
      }))
  }
  openSnackBar() {
    this._snackBar.open('Message edit Sucessfully', '', {
      duration: 3000
    });
}
}
