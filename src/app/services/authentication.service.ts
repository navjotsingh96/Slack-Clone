import { Injectable } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, UserProfile } from 'firebase/auth';
import { concatMap, from, of, switchMap, Observable } from 'rxjs';
import { Guest } from '../interface/guest';
import { User } from '../interface/user.class';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  loggedIn: boolean = false



  currentUser$ = authState(this.auth)            // Here we get the current user
  user: User;
  guset : Guest;
  GuestName:string;
  deleteUser;
  constructor(public auth: Auth, private firestore: AngularFirestore,
    public fireAuth: AngularFireAuth,
    public route: Router) {
    this.currentUser$
      .subscribe(user => {
        this.user = new User(user);
      })

  }

  login(username: string, password: string) {  
   this.deleteUser = from(signInWithEmailAndPassword(this.auth, username, password))  ;
     return from(signInWithEmailAndPassword(this.auth, username, password))          // Here we login a user
    
  }

  signUp(name: string, email: string, password: string) {
    // Here we create a new user
    return from(createUserWithEmailAndPassword(this.auth, email, password))
      .pipe(switchMap(({ user }) => updateProfile(user, { displayName: name })))

  }

  updateProfileData(profileData: any): Observable<any> {
    const user = this.auth.currentUser;           // i think here is the problem with the user
    return from(updateProfile(user, profileData));

  }

  guestLogin() {
   
    this.fireAuth.signInAnonymously().then((async () => {
      const user = this.auth.currentUser
      await from(updateProfile(user, { displayName: `${this.GuestName}` }));
      this.route.navigate(['home'])
    }))

  }

 logout() {       
    if(this.auth.currentUser.isAnonymous){
      const User = this.auth.currentUser;
     User.delete();
     from(this.auth.signOut())
    } else {                                   // Here we logout a user
    from(this.auth.signOut());
    }
  }


}
