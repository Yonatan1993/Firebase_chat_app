import {Component, OnDestroy, OnInit} from '@angular/core';
import {ChatService} from "../../services/chat.service";
import {Observable, Subscription} from "rxjs";
import {IChatRoom, IMessage} from "../../models";
import {ActivatedRoute, NavigationEnd, Router, RouterEvent} from "@angular/router";
import {filter} from "rxjs/operators";



@Component({
  selector: 'app-chat-container',
  templateUrl: './chat-container.component.html',
  styleUrls: ['./chat-container.component.scss']
})
export class ChatContainerComponent implements OnInit,OnDestroy {

  private subscription : Subscription = new Subscription()
  public rooms$ : Observable<Array<IChatRoom>>;
  public messages$ : Observable<Array<IMessage>>
  constructor(private chatService : ChatService, private router : Router, private activatedRoute : ActivatedRoute) {
    this.rooms$ = this.chatService.getRooms();
    const roomId : string = activatedRoute.snapshot.url[1].path;
    this.messages$ = this.chatService.getRoomMessages(roomId);

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
  }

}
