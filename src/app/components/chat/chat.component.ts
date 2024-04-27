import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {IMessage} from "../../models";
import {MatDialogRef} from "@angular/material/dialog";
import {AddRoomComponent} from "../add-room/add-room.component";
import {CdkVirtualScrollViewport} from "@angular/cdk/scrolling";

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


  constructor( ) { }

  ngOnInit(): void {

  }


 public sendMessage(message: string,input:HTMLInputElement):void {
   this.onSendMessage.emit(message);
   input.value = "";
  }
}
