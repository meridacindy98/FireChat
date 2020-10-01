import { Component } from '@angular/core';

import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { ChatService } from './services/chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  chats: Observable<any[]>;

  constructor( fireDatabase: AngularFireDatabase, public chatService: ChatService ){    
    /* this.chats = fireDatabase.list('chats').valueChanges();
    this.chats.subscribe( cosa => { 
      console.log("cosa");
      console.log(cosa);
    } ) */
  }

  logout(){
    this.chatService.logout();
  }

}
