export interface UserInterface {
    displayName: string;
    UID: string;
    email: string;
    password: string;
    photoUrl: string;
    key?: string;
  }
  
  export class User {

    displayName!: string;
    key!: string; // User UID from Firebase Auth
    photoURL: string;
    email!: string;
    uid: string;
  
    constructor(userJSON?: any) {
      this.displayName = userJSON ? userJSON.displayName : '';
      // this.key = userJSON ? userJSON.key : '';
      this.photoURL = userJSON ? userJSON.photoURL : '';
      this.email = userJSON ? userJSON.email : '';
      this.uid = userJSON ? userJSON.uid : '';
    }
  
    toJSON() {
      return {
        name: this.displayName,
        key: this.key,
        photoURL: this.photoURL,
        eamil: this.email,
      };
    }
  }