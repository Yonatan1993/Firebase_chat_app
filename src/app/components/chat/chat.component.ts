import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IMessage} from "../../models";
import {MatDialogRef} from "@angular/material/dialog";
import {AddRoomComponent} from "../add-room/add-room.component";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  @Input() messages: Array<IMessage> = [];
  @Output() onSendMessage: EventEmitter<string> = new EventEmitter<string>();
  constructor( ) { }

  ngOnInit(): void {
  }


 public sendMessage(message: string):void {
    console.log(message);
   this.onSendMessage.emit(message);
  }
}
