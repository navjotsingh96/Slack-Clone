import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dialog-edit-channelname',
  templateUrl: './dialog-edit-channelname.component.html',
  styleUrls: ['./dialog-edit-channelname.component.scss']
})
export class DialogEditChannelnameComponent implements OnInit {
  value: any;
  currentChannelID: any;
  constructor(private firestore: AngularFirestore,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.firestore
      .collection('channels')
      .doc(this.currentChannelID)
      .valueChanges()
      .subscribe((channelname => {
        this.value = channelname['channelName'];
        console.log(channelname);
        console.log(this.value);

      }))
  }

  update() {
    this.firestore
      .collection('channels')
      .doc(this.currentChannelID)
      .update({channelName :this.value})
      .catch((error => {
        console.log(error);
      }))
      .then((done => {
        console.log('done', done);
        this.openSnackBar();
      }))
  }
  openSnackBar() {
    this._snackBar.open('Channel name saved Sucessfully', '', {
      duration: 3000
    });
  }
}
