import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Router } from "@angular/router";
import * as _ from "lodash";
import { User } from "./login/user";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + localStorage.getItem('grizzly-token')
  });

  endpoint = environment.grizzlyUrlDefault;
  authMSendpoint = environment.grizzlyUrlIAMAPI;
  
  keycloaksignIn(username: string,password: string) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("username",username);
    queryParams = queryParams.append("password",password);
    queryParams = queryParams.append("identityProvider","KEYCLOAK");
    return this.http.get(this.authMSendpoint + '/authorization', {params:queryParams});
  }

  UserInfo() {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("identityProvider",localStorage.getItem('identityProvider'));

      if(localStorage.getItem('identityProvider') === 'Keycloak') {
        return this.http.get(this.authMSendpoint + '/userinfo', {headers : this.headers, params: queryParams});
      }
      if(localStorage.getItem('identityProvider') === 'Google') {
        return this.http.get(this.authMSendpoint + '/userinfo', {headers : this.headers, params: queryParams});
      }
      if(localStorage.getItem('identityProvider') === 'Github') {
        return this.http.get(this.authMSendpoint + '/userinfo', {headers : this.headers, params: queryParams});
      }
      if(localStorage.getItem('identityProvider') === 'Gitlab') {
        return this.http.get(this.authMSendpoint + '/userinfo', {headers : this.headers, params: queryParams});
      }
      if(localStorage.getItem('identityProvider') === 'Linkedin') {
        return this.http.get(this.authMSendpoint + '/userinfo', {headers : this.headers, params: queryParams});
      }
      if(localStorage.getItem('identityProvider') === 'Facebook') {
        return this.http.get(this.authMSendpoint + '/userinfo', {headers : this.headers, params: queryParams});
      }
  }

  getAllUsers(): Observable<User[]> {
      return this.http.get<User[]>(this.endpoint + '/allusers');
  }

  isConnected(): boolean {
      return !_.isEmpty(localStorage.getItem('grizzly-token'));
  }

  signIn(username: string, password: string) {
      return this.http.post(this.endpoint + '/signin', {
          username,
          password
      });
  }

  logout() {
      localStorage.clear();
      this.router.navigate(['/']);
  }

  signup(user: User) {
      return this.http.post(this.endpoint + '/signup', user);
  }

  deleteUser(username: string) {
      return this.http.delete(this.endpoint + '/deleteuser', {
          params: { username }
      });
  }

  getUser(username: string): Observable<User> {
      return this.http.get<User>(this.endpoint + '/user', {
          params: { username }
      });
  }

  me(): Observable<User> {
      return this.http.get<User>(this.endpoint + '/me');
  }

  getConnectedUser(): User {
      return JSON.parse(localStorage.getItem('grizzly-user'));
  }

  setConnectedUser(user: User): void {
      localStorage.setItem('grizzly-user', JSON.stringify(user));
  }

  activateUser(username: string): Observable<any> {
      return this.http.post(this.endpoint + '/activate', {}, {
          params: { username }
      });
  }

  updateUser(user: User) {
      return this.http.put(this.endpoint + '/updateuser', user, {
          params: { username: user.username }
      });
  }

}
