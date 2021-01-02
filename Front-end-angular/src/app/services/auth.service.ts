import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthLoginInfo } from '../models/login-info';
import { SignUpInfo } from '../models/signup-info';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    // Variables
    authUrl = 'http://localhost:8000/oauth/token';
    signupUrl = 'http://localhost:8000/api/register';
    apiUrl = 'http://localhost:8000/api';
    
    constructor( private http: HttpClient ) {
    }
    /**
     * Get an access token
     * @param email The email address
     * @param password The password string
     */
    login(authLogin: AuthLoginInfo):Observable<any> {
      return this.http.post(this.authUrl, {
        grant_type: 'password',
        client_id: '2',
        client_secret: '9PKLNF0ziJ0LhsgM1LC7W2LVT6dhzxsmvdPs1ski',
        username: authLogin.email,
        password: authLogin.password,
        scope: ''
      });
    }

    /**
     * Get an access token
     * @param email The email address
     * @param password The password string
     */
    register(signup: SignUpInfo) {
      return this.http.post(this.signupUrl, signup);
    }

    user(id_user):Observable<any> {
      return this.http.get(this.apiUrl+`/users/${id_user}`);
    }

    /**
     * Revoke the authenticated user token
     */
    logout() {
      return this.http.get(this.apiUrl + '/token/revoke');
    }
}
