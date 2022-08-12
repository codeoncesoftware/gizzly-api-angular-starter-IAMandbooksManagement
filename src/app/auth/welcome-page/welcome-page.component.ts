import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from "../../../environments/environment";
import { AuthService } from '../auth.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private authService: AuthService) { }

  authMSendpoint = environment.grizzlyUrlIAMAPI;
  clientId: string;
  clientSecret: string;

  ngOnInit(): void {
    if(this.route.snapshot.queryParamMap.get('token')) {
      const token = this.route.snapshot.queryParamMap.get('token');
      if(token){
        localStorage.setItem('identityProvider', jwt_decode(token)['identityProvider'])
        localStorage.setItem('grizzly-token', 'Bearer ' + token);
        this.router.navigate(['books']);
      }
    }
  }

  googleLogin() {
    window.location.href = this.authMSendpoint + '/authorization?identityProvider=google'+ '&redirect_uri=' + window.location.href;
  }
  githubLogin() {
    window.location.href = this.authMSendpoint + '/authorization?identityProvider=github' + '&redirect_uri=' + window.location.href;
  }
  gitlabLogin() {
    window.location.href = this.authMSendpoint + '/authorization?identityProvider=gitlab' + '&redirect_uri=' + window.location.href;
  }
  linkedinLogin() {
    window.location.href = this.authMSendpoint + '/authorization?identityProvider=linkedin' + '&redirect_uri=' + window.location.href;
  }
  facebookLogin() {
    window.location.href = this.authMSendpoint + '/authorization?identityProvider=facebook' + '&redirect_uri=' + window.location.href;
  }
  keycloakLogin() {
    this.router.navigate(['/keycloakLogin']);
  }
  grizzlyLogin() {
    this.router.navigate(['/login']);
  }

}
