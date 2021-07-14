import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

declare var $:any;

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  isStyleInvalid={'background-color':'#17a2b8','border-color':'#17a2b8'}
  isStyleValid={'background-color':'gray','border-color':'gray'}
  signUpForm:FormGroup;
  isClicked=false;
  signUpResultMessage="";

  constructor(private _AuthService:AuthService) {
    
    this.signUpForm=new FormGroup({
    "first_name":new FormControl(null,[Validators.required,Validators.minLength(3),Validators.pattern(/^([a-zA-Z]+[,.]?[ ]?|[a-z]+['-]?)+$/)]),
    "last_name":new FormControl(null,[Validators.required,Validators.minLength(3),Validators.pattern(/^([a-zA-Z]+[,.]?[ ]?|[a-z]+['-]?)+$/)]),
    "email":new FormControl(null,[Validators.required,Validators.email]),
    "age":new FormControl(null,Validators.required),
    "password":new FormControl(null,[Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,10}$/)])
  });

}

  SubmitSignUpFormData(){
    this.isClicked=true;

    if(this.signUpForm.valid){
      this._AuthService.signUp(this.signUpForm.value).subscribe(response =>{
        this.signUpResultMessage=response.message;
        
        if(response.message == "success"){
          this.signUpForm.reset;
          this.isClicked=false;
        }
        else{
          this.isClicked=false;
        }

      });
    }
  }

  ngOnInit(): void {
    $('#signUpSection').particleground();

  }

}
