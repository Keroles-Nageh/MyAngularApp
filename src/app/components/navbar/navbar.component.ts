import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  signIn=true;
  logoPath:string = 'assets/img/logo.png';
  isLoggedIn:boolean=false;

  constructor(public _AuthService:AuthService,private _Router:Router) { 

    _AuthService.currentUser.subscribe( (data)=>{
      if(data != null){
          this.isLoggedIn=true;
      }
      else{
        this.isLoggedIn=true; 
      }
    });

  }
  setSignUp(){this.signIn=false;}
  setSignIn(){this.signIn=true;}

  ngOnInit(): void {
  }

  logOut(){
    //let Token=localStorage.getItem("TOKEN");

    let JSONData={
      token:this._AuthService.GetUserToken()
    }

    this._AuthService.signOut(JSONData).subscribe(Response =>{
      this._Router.navigate(['/signin']);
    })
  }

}
