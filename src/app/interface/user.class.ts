export interface User {
    name: string;
<<<<<<< HEAD
    UID: string;
    email: string;
=======
    key: string;
    photoUrl: string;
>>>>>>> 5eb13e6ef28722b98f9b1e7d68c9ff2fed5feddf
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