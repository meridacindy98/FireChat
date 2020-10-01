import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Message } from '../interface/message.interface';

import { map } from 'rxjs/operators';

import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private itemsCollection: AngularFirestoreCollection<Message>;  

  public chats: Message[] = [];
  public userLocal: any = {};

  constructor( private afs: AngularFirestore, public auth: AngularFireAuth ) {
    auth.authState.subscribe( user => {
      console.log(user);
      if( !user ){
        return;
      }
      this.userLocal.name = user.email;
      this.userLocal.userId = user.uid;
      console.log(this.userLocal.name);
      console.log(this.userLocal.userId);
    } )
  }

  loadMessages(){
    this.itemsCollection = this.afs.collection<Message>('chats', ref => ref.orderBy('date', 'desc').limit(5));
    return this.itemsCollection.valueChanges().pipe(
      map( messages => {      
        this.chats = [];
        for( let message of messages ){
          this.chats.unshift(message);
        }        
      })
    );
  }

  addMessage( text: string ){    
    let message: Message = {      
      userId: this.userLocal.userId,
      name: this.userLocal.name,
      message: text,
      date: new Date().getTime()
    }
    return this.itemsCollection.add( message );
  }

  login(prov: string) {
    if ( prov === 'google' ){
      this.auth.signInWithPopup(new auth.GoogleAuthProvider());
    }else{
      this.auth.signInWithPopup(new auth.GithubAuthProvider()); 
    }    
  }
  logout() {
    this.userLocal = {};
    this.auth.signOut();
  }
}
