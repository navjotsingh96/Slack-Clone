import { Component, ElementRef, Injectable, Input, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatRoomComponent } from '../chat-room/chat-room.component';
import { Chat } from '../interface/chat';
import { AuthenticationService } from '../services/authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditMessagesComponent } from '../dialog-edit-messages/dialog-edit-messages.component';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.scss']
})
@Injectable({ providedIn: 'root' })

export class ThreadComponent implements OnInit {
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  messageID;
  threadmsg;
  chat$: Chat = new Chat;
  userID;
  channelID;
  threadHeading;
  @ViewChild('ThreadContainer') threadContainer: ElementRef

  fb;

  constructor(private firestore: AngularFirestore, private router: Router,
    private route: ActivatedRoute,
    public authService: AuthenticationService,
    public chat: ChatRoomComponent,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    private storage: AngularFireStorage) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((parmsMap => {
      this.messageID = parmsMap.get('id');
      this.chat$.user;
    }))
    this.channelID = this.router.url.split('/')[2];
    console.log('I got ID of Message', this.channelID)
    this.getThreadMsg();
    this.getmsg();
    console.log('THread messag id', this.messageID);

  }


  getmsg() {
    this.firestore
      .collection(this.channelID)
      .doc(this.messageID)
      .valueChanges()
      .subscribe((msg => {
        this.threadHeading = msg;
        console.log((this.threadHeading));

      }))

  }

  getThreadMsg() {
    this.threadmsg;
    this.firestore
      .collection('threads')
      .doc(this.messageID)
      .collection(this.messageID)
      .valueChanges({ idField: 'customIdName' })
      .subscribe((thread => {
        this.threadmsg = thread;
        console.log('Threads', thread);
        this.threadmsg = thread.sort((mess1: any, mess2: any) => { // neu nachrichen werden am Ende gezeigt
          return mess1.time - mess2.time;
        });

      }))
  }

  getId() {
    this.chat$.user = (<HTMLInputElement>document.getElementById("user-name")).value
    console.log(this.chat$.user);
  }

  submit() {
    if (!this.chat$.message && !this.fb) {
      this.enterMessageSnackBar()
    }
    if (this.fb && !this.chat$.message) {
      this.sumbitImageWithMessage()
    }
    if (!this.fb) {
      this.submitMessage();
    }
    if (this.chat$.message && this.fb) {
      this.sumbitImageWithMessage()
    }
    this.chat$.message = '';
    this.chat$.image = '';
  }

  //Upload image and show
  sumbitImageWithMessage() {
    this.getId()
    this.chat$.image = this.fb
    this.firestore
      .collection('threads')
      .doc(this.messageID)
      .collection(this.messageID)
      .add(this.chat$.toJSON())
      .then((message: any) => {
        this.messageID = message.id;
        this.scrollObjectDown(this.threadContainer);
      }).catch((err) => {
        console.log('Error', err);
      })
  }

  //Upload message to firestore

  submitMessage() {
    this.getId();
    this.firestore
      .collection('threads')
      .doc(this.messageID)
      .collection(this.messageID)
      .add(this.chat$.toJSON())
      .then((added => {
        console.log('Added', added);
        this.scrollObjectDown(this.threadContainer)
      }))
  }

  // delete compelte message
  deleteMesage(idofThread, url) {
    if (url) {
      console.log('true');
      this.deleteThreadStorage(url)
      this.deleteThreadFirestore(idofThread);
    } else
      console.log('false');
    this.deleteThreadFirestore(idofThread);
  }


  // delete message from firestore. IF user delete only msg
  deleteThreadFirestore(idofThread) {
    this.firestore
      .collection('threads')
      .doc(this.messageID)
      .collection(this.messageID)
      .doc(idofThread)
      .delete()
      .then((done => {
        this.openSnackBar();
      }))

  }

  // delete images from storage. If user want to delete compelte msg with image
  deleteThreadStorage(downloadURL) {
    this.storage.storage.refFromURL(downloadURL).delete();

  }


  deleteImage(idofThread, downloadURL) {
    this.storage.storage.refFromURL(downloadURL).delete()
    this.firestore
      .collection('threads')
      .doc(this.messageID)
      .collection(this.messageID)
      .doc(idofThread)
      .update({ image: '' })
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

  openDialog(messageID) {
    const dialogRef = this.dialog.open(DialogEditMessagesComponent)
    dialogRef.componentInstance.threadMessageID = messageID;
    dialogRef.componentInstance.messageID = this.messageID;
    console.log('from thrread', messageID);
  }

  scrollObjectDown(object: ElementRef) {
    object.nativeElement.scrollTop = object.nativeElement.scrollHeight;
  }

  uploadFile(event) {
    const file = event.target.files[0];
    const filePath = `threadImages/${file.name}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              this.fb = url;
            }
            console.log(this.fb);
          });
        })
      )
      .subscribe(url => {
        if (url) {
          console.log(url);
        }
      });
  }


}

