import { Injectable } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

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

  constructor(public auth: Auth, private firestore: AngularFirestore,) {
    this.currentUser$
      .subscribe(user => {
        this.user = new User(user);
      })

  }

  login(username: string, password: string) {              // Here we login a user
    return from(signInWithEmailAndPassword(this.auth, username, password))
  }

  signUp(name: string, email: string, password: string) {     // Here we create a new user
    return from(createUserWithEmailAndPassword(this.auth, email, password))
      .pipe(switchMap(({ user }) => updateProfile(user, { displayName: name })));

  }

  updateProfileData(profileData: Partial<User>): Observable<any> {
    const user = this.auth.currentUser;
    return from(updateProfile(user, profileData));
  }

  logout() {                                           // Here we logout a user
    return from(this.auth.signOut());
  }


}
