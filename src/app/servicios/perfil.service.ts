import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { doc, docData, Firestore, setDoc } from '@angular/fire/firestore';
import { getDownloadURL, ref, Storage, uploadString } from '@angular/fire/storage';
import { Photo } from '@capacitor/camera';
@Injectable({
  providedIn: 'root'
})
export class PerfilService {
  constructor(
    private auth: Auth,
    private firestore:Firestore,
    private storage:Storage
  ) { }

  getUserProfile(){
    const user = this.auth.currentUser;
    const userDocumentRef = doc(this.firestore, `users/${user.uid}`);
    return docData(userDocumentRef);
  }

  async uploadImage(image:Photo){
    const user = this.auth.currentUser;
    const path = `uploas/${user.uid}/profile.png`
    const storageRef = ref(this.storage, path);
    try {
      await uploadString(storageRef, image.base64String,'base64' );
      const imageUrl = getDownloadURL(storageRef);
      const userDocumentRef = doc(this.firestore, `users/${user.uid}`);
      await setDoc(userDocumentRef, imageUrl);
      return true;
    } catch (error) {
      return null;
    }

  }
}
 