import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { Category, JwtToken, Role, Title, UserJwtToken, UserLogin, UserToken } from './model';
import jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private route: ActivatedRoute
    ) { 
      this.getReturnUrl();
    }

  baseUrl:string='http://localhost:5207/';

  getTitle(): Observable<Array<Title>> {
    return this.httpClient.get<Array<Title>>(this.baseUrl + 'api/titles');
  }

  getTitleById(Id : any): Observable<Title>{
    return this.httpClient.get<Title>(this.baseUrl + 'api/titles/' + Id);
  }

  setUpdateTitle(title: Title) {
    return this.httpClient.post(this.baseUrl + 'api/titles', title,{responseType: 'text'});
  }

  deleteTitle(id:any) {
    return this.httpClient.post(this.baseUrl + 'api/titles/' + id, null,{responseType: 'text'});
  }

  getCategory(): Observable<Array<Category>> {
    return this.httpClient.get<Array<Category>>(this.baseUrl + 'api/categories');
  }

  getCategoryById(id:number): Observable<Category> {
    return this.httpClient.get<Category>(this.baseUrl + 'api/categories/' + id);
  }

  setUpdateCategory(category: Category) {
    return this.httpClient.post(this.baseUrl + 'api/categories', category,{responseType: 'text'});
  }

  deleteCategory(id:any) {
    return this.httpClient.post(this.baseUrl + 'api/categories/' + id, null,{responseType: 'text'});
  }

  TOKEN_KEY = 'token';
  returnUrl: string = '';

  getReturnUrl() {
    this.route.queryParams.subscribe(params => {
      this.returnUrl = params['returnUrl'];
    })
  }

  logIn(loginUser: UserLogin){

    // if(log.user == 'a' && log.password == 'a'){
    //   this.saveToken(Role.Admin)
    //   return true;
    // }else if (log.user == 'u' && log.password == 'u') {
    //   this.saveToken(Role.User)
    //   return true;
    // } else {
    //   return false;
    // }

    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    this.httpClient.post(this.baseUrl + 'accounts/login', loginUser, { headers: headers, responseType: 'text' }).subscribe(data => {

      this.saveToken(new BehaviorSubject<UserToken>(JSON.parse(data)).value.token);
      this.router.navigateByUrl('/' + this.returnUrl);

    });
  }

  saveToken(token:any) {
    localStorage.setItem(this.TOKEN_KEY, JSON.stringify(token));
    // localStorage.setItem(this.TOKEN_KEY, token);
  }

  logOut() {
    localStorage.removeItem(this.TOKEN_KEY);
    this.router.navigateByUrl('/');
  }

  get token() {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  get isAuthenticated() {
    return this.token != null;
  }
  
  loggedIn() {
    return this.token != null;
  }

  get userValue(): UserJwtToken {
    if (this.token) {
      const decoded: JwtToken = jwt_decode(this.token);
      const userToken: UserJwtToken = { id: parseInt(decoded.id), role: decoded.role, name: decoded.given_name, email: decoded.email, exp: decoded.exp, iat: decoded.iat, nbf: decoded.nbf } //JSON.parse(decoded.role)
      return userToken;
    } else {
      // return this.userToken;
      return new UserJwtToken();
    }
  }
}
