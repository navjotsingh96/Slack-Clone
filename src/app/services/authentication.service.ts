import { Injectable } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, UserProfile } from 'firebase/auth';
import { concatMap, from, of, switchMap, Observable } from 'rxjs';
import { User } from '../interface/user.class';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  loggedIn: boolean = false



  currentUser$ = authState(this.auth)            // Here we get the current user
  user: User;

  constructor(public auth: Auth, private firestore: AngularFirestore,
    public fireAuth: AngularFireAuth,
    public route: Router) {
    this.currentUser$
      .subscribe(user => {
        this.user = new User(user);
      })

  }

  login(username: string, password: string) {              // Here we login a user
    return from(signInWithEmailAndPassword(this.auth, username, password))
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
      await from(updateProfile(user, { displayName: 'Guest' }));
      this.route.navigate(['home'])
    }))

  }

  logout() {                                           // Here we logout a user
    return from(this.auth.signOut());
  }


}
