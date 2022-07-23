import { Injectable } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, UserProfile } from 'firebase/auth';
import { concatMap, from, of, switchMap ,Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {


  // loggedIn: boolean = false

  currentUser$ = authState(this.auth)            // Here we get the current user

  constructor(public auth: Auth) { }

  login(username : string, password : string){              // Here we login a user
  return from(signInWithEmailAndPassword(this.auth, username, password))
  }

  signUp(name : string ,email : string, password : string){     // Here we create a new user
    return from(createUserWithEmailAndPassword(this.auth, email , password))
    .pipe(switchMap(({ user }) => updateProfile(user, {displayName: name})));
    
  }

  updateProfileData(profileData: Partial<UserProfile>): Observable<any>{
    const user = this.auth.currentUser;
    return of(user).pipe(
      concatMap(user => {
        if(!user) throw new Error('not found');

        return updateProfile(user, profileData);
      })
    )
    
  }

  logout(){                                           // Here we logout a user
    return from(this.auth.signOut());
  }

  
}
