import { Component, OnInit } from '@angular/core';
import { User } from '../../auth/login/user';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: any;
  username: string;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    if(localStorage.getItem('identityProvider') === 'None') {
      this.user = new User();
      this.authService.me()
      .subscribe(user => {
        this.user = user;
      });
    } else {
      this.authService.UserInfo().subscribe(res => {
        this.user = res;
      });
    }

  }

  update() {
    this.authService.updateUser(this.user)
      .subscribe(res => {
        if(res) {
          this.router.navigate(['home']);
        }
      });
  }

}
