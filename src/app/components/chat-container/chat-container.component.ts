import {Component, OnDestroy, OnInit} from '@angular/core';
import {ChatService} from "../../services/chat.service";
import {Observable, Subscription} from "rxjs";
import {IChatRoom, IMessage} from "../../models";
import {ActivatedRoute, NavigationEnd, Router, RouterEvent} from "@angular/router";
import {filter} from "rxjs/operators";
import {MatDialog} from "@angular/material/dialog";
import {AddRoomComponent} from "../add-room/add-room.component";
import {AuthService} from "../../services/auth.service";



@Component({
  selector: 'app-chat-container',
  templateUrl: './chat-container.component.html',
  styleUrls: ['./chat-container.component.scss']
})
export class ChatContainerComponent implements OnInit,OnDestroy {


  private userId: string = "";
  private roomId?: string ;
  private subscription : Subscription = new Subscription()
  public rooms$ : Observable<Array<IChatRoom>>;
  public messages$? : Observable<Array<IMessage>>
  constructor(private chatService : ChatService,
              private auth : AuthService,
              private router : Router,
              private activatedRoute : ActivatedRoute,
              public dialog: MatDialog) {
    this.rooms$ = this.chatService.getRooms();

    if(activatedRoute.snapshot.url.length > 1){

       this.roomId  = activatedRoute.snapshot.url[1].path;
      this.messages$ = this.chatService.getRoomMessages(this.roomId);
    }


    this.subscription.add(router.events.pipe(filter(data=> data instanceof NavigationEnd))
      .subscribe(data =>{
        const routeEvent: RouterEvent = data as RouterEvent;
        const urlArr = routeEvent.url.split("/");
        if(urlArr.length > 2){
          this.messages$ = this.chatService.getRoomMessages(urlArr[2]);
        }
    }))
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    }

  ngOnInit(): void {
    this.subscription.add(
      this.auth
        .getUserData()
        .pipe(filter(data => !!data))
      .subscribe(user => {
        this.userId = user.uid;
      })
    );
  }

  onOpenRoomModal(): void {
    const dialogRef = this.dialog.open(AddRoomComponent, {
    width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      this.onAddRoom(result,this.userId)

    });
  }

  public onAddRoom(roomName : string, userId: string){
    this.chatService.addRoom(roomName, userId);
  }

  public OnSendMessage(message:string):void{
    if(this.userId && this.roomId){
      this.chatService.sendMessage(this.userId, message, this.roomId);
    }
  }


}
