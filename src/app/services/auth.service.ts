import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable ,BehaviorSubject} from 'rxjs';
import jwt_decode from "jwt-decode";
import { Router } from '@angular/router';
import { CurrentUserDetails } from '../Classes/CurrentUserDetails';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseURL="https://routeegypt.herokuapp.com";
  currentUser = new BehaviorSubject(null);

  constructor(private _HttpClient:HttpClient, private _Router:Router) { }

  signUp(data:any): Observable<any>
  {
    return this._HttpClient.post(`${this.baseURL}/signup`,data)
  }

  signIn(data:any):Observable<any>
  {
    return  this._HttpClient.post(`${this.baseURL}/signin`,data)
  }

  signOut(data:any):Observable<any>
  {
    this.currentUser.next(null);
    localStorage.setItem('TOKEN','');
    
    return this._HttpClient.post(`${this.baseURL}/signOut`,data)
  }

  isLoggedIn()
  {
    return !!localStorage.getItem('TOKEN')
  }

  GetUserToken(){
    if(this.isLoggedIn()){
      return localStorage.getItem('TOKEN');
    }
    return '';
  }

  GetUserID(){
    if(this.isLoggedIn()){
      try
      {
        let token = localStorage.getItem('TOKEN')!;
        let decoded:any = jwt_decode(token);
        return decoded._id;
      }
      catch(error){
        localStorage.clear();
        this._Router.navigate(['/signin']);
        return '';
      }
    }
    return '';
  }

  saveCurrentUserDetails(first_name:string, last_name:string, email:string, age:number,userID:string, token:string){
    let user=new CurrentUserDetails(first_name, last_name, email, age,userID, token) as any;
    this.currentUser.next(user);
  }
}
