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

  authMSendpoint = environment.grizzlyUrlAuthMS;
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
    window.location.href = this.authMSendpoint + '/authorization?identityProvider=google&client_id=' + this.clientId + '&client_secret=' + this.clientSecret
    + '&redirect_uri=' + window.location.href;
    localStorage.setItem('client_id', this.clientId);
    localStorage.setItem('client_secret', this.clientSecret);
  }
  githubLogin() {
    window.location.href = this.authMSendpoint + '/authorization?identityProvider=github&client_id=' + this.clientId + '&client_secret=' + this.clientSecret
    + '&redirect_uri=' + window.location.href;
    localStorage.setItem('client_id', this.clientId);
    localStorage.setItem('client_secret', this.clientSecret);
  }
  gitlabLogin() {
    window.location.href = this.authMSendpoint + '/authorization?identityProvider=gitlab&client_id=' + this.clientId + '&client_secret=' + this.clientSecret
    + '&redirect_uri=' + window.location.href;
    localStorage.setItem('client_id', this.clientId);
    localStorage.setItem('client_secret', this.clientSecret);
  }
  linkedinLogin() {
    window.location.href = this.authMSendpoint + '/authorization?identityProvider=linkedin&client_id=' + this.clientId + '&client_secret=' + this.clientSecret
    + '&redirect_uri=' + window.location.href;
    localStorage.setItem('client_id', this.clientId);
    localStorage.setItem('client_secret', this.clientSecret);
  }
  facebookLogin() {
    window.location.href = this.authMSendpoint + '/authorization?identityProvider=facebook&client_id=' + this.clientId + '&client_secret=' + this.clientSecret
    + '&redirect_uri=' + window.location.href;
    localStorage.setItem('client_id', this.clientId);
    localStorage.setItem('client_secret', this.clientSecret);
  }
  keycloakLogin() {
    this.router.navigate(['/keycloakLogin'],
    { queryParams: { client_id: this.clientId, 'client_secret': this.clientSecret } });
  }
  grizzlyLogin() {
    this.router.navigate(['/login']);
  }

}
