import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from "@angular/router";

declare var $:any;
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  SignInForm:FormGroup;
  isClicked=false;
  ErrorMessage="";

  constructor(private _AuthService:AuthService, private _Router:Router) { 

    if(this._AuthService.isLoggedIn()){
      this._Router.navigate(['/profile']);
    }

    this.SignInForm=new FormGroup({
      "email":new FormControl(null,[Validators.required,Validators.email]),
      "password":new FormControl(null,[Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,10}$/)])
    });
  }

  SignInFormData(){

    this.isClicked=true;

    if(this.SignInForm.valid){
      this._AuthService.signIn(this.SignInForm.value).subscribe(response =>{
        this.isClicked=false;

        if(response.message == "success"){
          this._AuthService.saveCurrentUserDetails(response.user.first_name,response.user.last_name,response.user.email,response.user.age,response.user._id,response.token);
          localStorage.setItem("TOKEN",response.token);
          this._Router.navigate(["/profile"]);
        }
        else{
          this.ErrorMessage=response.message;
        }

      });
    }
  }

  ngOnInit(): void {
    $('#signInSection').particleground();
  }

}
