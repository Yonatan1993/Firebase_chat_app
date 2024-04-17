import { Injectable, NgZone } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { User } from '../models/user.interface';
import {BehaviorSubject, Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private isLoggin$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private userDetails$: Subject<User> = new Subject<User>();
constructor(private afs : AngularFirestore, private afAuth : AngularFireAuth, private router:Router) {

  const saveUserString = localStorage.getItem('user');
  if(saveUserString != null){
    this.isLoggin$.next(true);
  }

  afAuth.authState.subscribe(user =>{
    if(!!user){
      this.userDetails$.next(<User>user);
      const userString: string = JSON.stringify(user);
      localStorage.setItem('user', userString);
      this.isLoggin$.next(true);
    }else{
      localStorage.removeItem('user');
      this.isLoggin$.next(false);
    }
  })
}

public sighnInWithGoogle(){
  this.authLogin(new firebase.default.auth.GoogleAuthProvider());
}

  private authLogin(provider : firebase.default.auth.AuthProvider){
      return this.afAuth.signInWithPopup(provider).then(res =>{
        this.setUserData(<User>res.user);
      })
  }

  private setUserData(user?: User) : Promise<void> | void{
  if(!user) return;
    const userRef : AngularFirestoreDocument<User> = this.afs.doc(
      `users/${user.uid}`
    )

    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName : user.displayName,
      photoURL : user.photoURL
    }

    return userRef.set(userData,{
      merge:true
    });
  }

  public signOut():Promise<void>{
    return this.afAuth.signOut().then(() =>{
      localStorage.removeItem('user');
      this.router.navigate(['/'])
      this.userDetails$.next(undefined);
    })
  }

  public isLoggedIn(): Observable<boolean>{
    return this.isLoggin$.asObservable();
  }
}
