import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddChannelsComponent } from './dialog-add-channels/dialog-add-channels.component';
import { AuthenticationService } from './services/authentication.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {


  constructor(firestore: AngularFirestore,
    public dialog: MatDialog,
  ){}
  
}
