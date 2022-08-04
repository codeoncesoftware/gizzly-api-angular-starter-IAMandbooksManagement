import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../app/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private authService: AuthService) { }

  userInfo : any;
  ngOnInit() {
    this.authService.UserInfo().subscribe(res => console.log(res))

  }

 /* logout() {
    this.authService.logout();
  }*/

}
