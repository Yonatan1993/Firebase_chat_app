import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'angular-firebase-chat';

  constructor(private authService: AuthService) {}

  ngOnInit() {}

  public  sighInWithGoogle(){
    this.authService.sighnInWithGoogle();
  }
}
