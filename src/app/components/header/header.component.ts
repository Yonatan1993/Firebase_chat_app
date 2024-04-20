import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Observable, Subscription} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit,OnDestroy {

  private subscription: Subscription = new Subscription();
  public isLoggedIn$: Observable<boolean>
  //public isLoggedIn = false;
  constructor(private authService: AuthService) {
    this.isLoggedIn$ = authService.isLoggedIn();
  }

  ngOnDestroy(): void {
    //this.subscription.unsubscribe();
    }

  ngOnInit(): void {


   /* this.subscription.add(
      this.authService.isLoggedIn().subscribe(data =>{
        this.isLoggedIn = data;
      })
    )*/

  }

  public loginWithGoogle():void{
    this.authService.sighnInWithGoogle();
  }

  public signOut():void{
    this.authService.signOut();
  }

}
