import { Component } from '@angular/core';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'firstProject';
  constructor(public us:UserService){}
  onlogout()
  {
    localStorage.clear()
    this.us.userloginstatus=false
  }
}
