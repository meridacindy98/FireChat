import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  message: string = "";
  element: any;

  constructor( public chatService: ChatService ) {
    this.chatService.loadMessages().subscribe( () => {

        setTimeout( () => {
          this.element.scrollTop = this.element.scrollHeight;
        }, 20);
        
    } );
  }

  ngOnInit(): void {
    this.element = document.getElementById('app-message');
  }

  sendMessage(){
    console.log(this.message);
    if ( this.message.length === 0 ){
      return;
    }else{
      this.chatService.addMessage( this.message )
                                  .then( () => this.message = "" )
                                  .catch( (error) => console.error("mensaje no enviado") )
    }
  }

}
