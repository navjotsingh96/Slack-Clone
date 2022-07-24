import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service'; 

@Component({
  selector: 'app-dialog-add-dm',
  templateUrl: './dialog-add-dm.component.html',
  styleUrls: ['./dialog-add-dm.component.scss']
})
export class DialogAddDmComponent implements OnInit {

  users: any = [];
  currantUserUID: any;
  allUsers

  constructor(private firestore: AngularFirestore, private router: Router, private authService: AuthenticationService) { }

  /**
   * Load all Users form Firebase
   */
  ngOnInit(): void {
    this.firestore
      .collection('users')
      .valueChanges({ idField: 'userId' })
      .subscribe((changes: any) => {
        this.users = changes;
        console.log('DM component -> All users:', this.users)
      });

      this.currantUserUID = this.authService.auth.currentUser.uid
      
      
      console.log('currant user:', this.currantUserUID)
      console.log('Selected user:', this.selectedUsers)
  }

  selectedUsers = new FormControl();

  selectedUsersArray = []

  usersWithoutMe() {
    return this.users.filter(
      (user: any) => !(user.name == this.authService.auth.currentUser.displayName)
    );
  }


  createDMChannel() {

      this.selectedUsers.value.forEach((user: any) => {
        this.selectedUsersArray.push(user);
        console.log('selected Users array:', this.selectedUsersArray)
      });

  //   this.firestore
  //   .collection('directMessage')
  //   .add(this.firestore)
  //   .then( (DM: any) => {
  //     console.log(DM)
  //   });
  }

}
