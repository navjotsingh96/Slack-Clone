import { Injectable } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { from, switchMap } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  currentUser$ = authState(this.auth)            // Here we get the current user
  constructor(private auth: Auth) { }

  login(username : string, password:string){              // Here we login a user
  return from(signInWithEmailAndPassword(this.auth, username, password));
  }

  signUp(name:string ,email: string, password: string){     // Here we create a new user
    return from(createUserWithEmailAndPassword(this.auth, email , password))
    .pipe(switchMap(({ user }) => updateProfile(user, {displayName: name})));
    
  }

  logout(){                                           // Here we logout a user
    return from(this.auth.signOut());
  }

  
}
