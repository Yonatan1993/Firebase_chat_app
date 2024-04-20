import {Component, Input, OnInit} from '@angular/core';
import {IMessage} from "../../models";
import {MatDialogRef} from "@angular/material/dialog";
import {AddRoomComponent} from "../add-room/add-room.component";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  @Input() meessages: Array<IMessage> = [];
  constructor( ) { }

  ngOnInit(): void {
  }


}
