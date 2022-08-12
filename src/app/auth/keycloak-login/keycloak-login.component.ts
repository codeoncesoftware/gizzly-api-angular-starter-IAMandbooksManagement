import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-keycloak-login',
  templateUrl: './keycloak-login.component.html',
  styleUrls: ['./keycloak-login.component.scss']
})
export class KeycloakLoginComponent implements OnInit {
  username: string;
  password: string;
  clientId: string;
  clientSecret: string;
  constructor(private router: Router, private authService: AuthService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.clientId = this.route.snapshot.queryParamMap.get('client_id');
    this.clientSecret = this.route.snapshot.queryParamMap.get('client_secret');
  }

  login(): void {
    const token = 'access_token';
  
    this.authService.keycloaksignIn(this.username, this.password).subscribe(res => {
      console.log(res['token']);
      if (res) {    
        localStorage.setItem('grizzly-token', 'Bearer ' + res['token']);
        localStorage.setItem('identityProvider','Keycloak');
        this.router.navigate(['books']);
      }
    },
    error => {
      console.log('Invalid Credentials')
    },
   );
  }
}
