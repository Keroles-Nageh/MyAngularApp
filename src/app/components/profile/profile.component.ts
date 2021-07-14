import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {Router} from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NotesService } from 'src/app/services/notes.service';
declare var $:any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
allUserNotes:any;
AddNotesForm:FormGroup;
EditNotesForm:FormGroup;
isLoading=false;
selectedNoteID?:Number;
searchTerm:any

  constructor(private _Router:Router,public _NotesService:NotesService, private _AuthService:AuthService) {
    
    this.AddNotesForm=new FormGroup({
      "AddNotesFormTitle":new FormControl(null,[Validators.required]),
      "AddNotesFormDesc":new FormControl(null,[Validators.required])
    });
    this.EditNotesForm=new FormGroup({
      "EditNotesFormTitle":new FormControl(null,[Validators.required]),
      "EditNotesFormDesc":new FormControl(null,[Validators.required])
    });

    /*if(!localStorage.getItem("TOKEN")){
      this._Router.navigate(["/signin"]);
    }*/
    if(!this._AuthService.isLoggedIn()){
      this._Router.navigate(["/signin"]);
    }

    this.getAllUserNotes();
   }

   getAllUserNotes(){
    this.isLoading=true;
    let jsonFormat={
      "token":`${this._AuthService.GetUserToken()}`,
      "userID":`${this._AuthService.GetUserID()}`
      }

      this._NotesService.getUserNotes(jsonFormat).subscribe( response =>{
        this.isLoading=false;
        this.AddNotesForm.reset();
        this.EditNotesForm.reset();

        if(response.message == 'success'){
          this.allUserNotes=response.Notes;
        }
      });
   }

   AddUserNote(){
    let jsonFormat={
        "title":this.AddNotesForm.value.AddNotesFormTitle,
        "desc":this.AddNotesForm.value.AddNotesFormDesc,
        "citizenID":`${this._AuthService.GetUserID()}`,
        "token":`${this._AuthService.GetUserToken()}`
        }
    this._NotesService.addUserNotes(jsonFormat).subscribe( response =>{
      if(response.message == 'success'){
        $("#AddNote").modal('hide');
        this.AddNotesForm.reset();
        this.getAllUserNotes();
      }
    });
   }

   saveNoteID(id:number){
    this.selectedNoteID=id;
   }

   deleteUserNote(){
     let data={
      "NoteID":this.selectedNoteID,
      "token": this._AuthService.GetUserToken()
      }

      this._NotesService.deleteUserNotes(data).subscribe(response =>{
      $("#DeleteNote").modal('hide');
        this.getAllUserNotes();
    });
   }

   setEditNotesFormValue(){
    for (let index = 0; index < this.allUserNotes.length; index++) {
        if(this.allUserNotes[index]._id==this.selectedNoteID)
        {
          this.EditNotesForm.controls.EditNotesFormTitle.setValue(this.allUserNotes[index].title)
          this.EditNotesForm.controls.EditNotesFormDesc.setValue(this.allUserNotes[index].desc)
        }
      }
   }

   EditUserNote(){
    let jsonFormat={
      "token":`${this._AuthService.GetUserToken()}`,
      "title":this.EditNotesForm.value.EditNotesFormTitle,
      "desc":this.EditNotesForm.value.EditNotesFormDesc,
      "NoteID":this.selectedNoteID
      }
    this._NotesService.updateUserNotes(jsonFormat).subscribe( response =>{
      if(response.message == 'updated'){
        $("#EditNote").modal('hide');
        this.EditNotesForm.reset();
        this.getAllUserNotes();
      }
    });
   }

  ngOnInit(): void {
  }

}
