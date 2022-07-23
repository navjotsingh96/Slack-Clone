export interface User {
    name: string;
    key: string;
    photoUrl: string;
  }
  
  export class User {
    name!: string;
    key!: string; // User UID from Firebase Auth
    photoUrl: string;
  
    constructor(userJSON?: User) {
      this.name = userJSON ? userJSON.name : '';
      this.key = userJSON ? userJSON.key : '';
      this.photoUrl = userJSON ? userJSON.photoUrl : '';
    }
  
    toJSON() {
      return {
        name: this.name,
        key: this.key,
        photoUrl: this.photoUrl,
      };
    }
  }