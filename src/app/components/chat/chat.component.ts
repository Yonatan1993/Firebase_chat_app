import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {IMessage} from "../../models";
import {MatDialogRef} from "@angular/material/dialog";
import {AddRoomComponent} from "../add-room/add-room.component";
import {CdkVirtualScrollViewport} from "@angular/cdk/scrolling";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  @ViewChild("virtualScroll") virtualScroll?: CdkVirtualScrollViewport;
  @Output() onSendMessage: EventEmitter<string> = new EventEmitter<string>();
  @Input() set messages(messages:Array<IMessage>){
    this._messages = messages.sort((x,y)=>{

      return x.timestamp - y.timestamp;
    });

    let index = this._messages.length - 1;
    this.virtualScroll?.scrollToIndex(index);
  }
  get messages(){
    return this._messages;
  }
  private _messages: Array<IMessage> = [];

  public userId : string;

  constructor(private authService : AuthService ) {
    this.userId = authService.getUserId();
  }

  ngOnInit(): void {
    console.log(this.userId);

  }


 public sendMessage(message: string,input:HTMLInputElement):void {
   this.onSendMessage.emit(message);
   input.value = "";
  }
}
