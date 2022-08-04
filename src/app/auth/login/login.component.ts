
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { environment } from "../../../environments/environment";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;
  url: string;
  endpoint = environment.grizzlyUrlDefault;
  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private authService: AuthService) { }

  ngOnInit() {
    if(this.route.snapshot.queryParamMap.get('token')) {
      const token = this.route.snapshot.queryParamMap.get('token');
      console.log(token)
      if(token){
        localStorage.setItem('grizzly-token', 'Bearer ' + token);
        this.router.navigate(['home']);
      }
    }
  }


  login(): void {
    const token = 'token';

    this.authService.signIn(this.email, this.password).subscribe(res => {
      console.log(res)
      if (res[token]) {
        // Save Token in localStorage to inject in further HTTP Requests
        localStorage.setItem('grizzly-token', 'Bearer ' + res[token]);
        this.authService.me().subscribe(u => this.authService.setConnectedUser(u));
        localStorage.setItem('identityProvider','None');
        this.router.navigate(['home']);
      }
    });
  }
  Googlelogin(): void {
    //Because we don"t have a response we have a redirection
    window.location.href = this.endpoint + '/authorization/google';
  }

}

function res(res: any) {
  throw new Error('Function not implemented.');
}

