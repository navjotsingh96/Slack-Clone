export interface UserInterface {
    displayName: string;
    UID: string;
    email: string;
    photoUrl: string;
    key?: string;
  }
  
  export class User {
    updateProfileData(arg0: { photoUrl: string; }): any {
      throw new Error('Method not implemented.');
    }
    displayName!: string;
    key!: string; // User UID from Firebase Auth
    photoUrl: string;
    email!: string;
    uid: string;
  
    constructor(userJSON?: any) {
      this.displayName = userJSON ? userJSON.name : '';
      this.key = userJSON ? userJSON.key : '';
      this.photoUrl = userJSON ? userJSON.photoUrl : '';
      this.email = userJSON ? userJSON.email : '';
      this.uid = userJSON ? userJSON.uid : '';
    }
  
    toJSON() {
      return {
        name: this.displayName,
        key: this.key,
        photoUrl: this.photoUrl,
        eamil: this.email,
      };
    }
  }