import { Component, OnInit } from '@angular/core';
import {ChatService} from "../../services/chat.service";
import {Observable} from "rxjs";
import {IChatRoom} from "../../models";

@Component({
  selector: 'app-chat-container',
  templateUrl: './chat-container.component.html',
  styleUrls: ['./chat-container.component.scss']
})
export class ChatContainerComponent implements OnInit {

  public rooms$ : Observable<Array<IChatRoom>>;
  constructor(private chatService : ChatService) {
    this.rooms$ = this.chatService.getRooms();
  }

  ngOnInit(): void {
  }

}
