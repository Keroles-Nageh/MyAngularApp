import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor(private _HttpClient:HttpClient,private _AuthService:AuthService) { }

  getUserNotes(data:any):Observable<any>{
    return this._HttpClient.post(`${this._AuthService.baseURL}/getUserNotes`,data);
  }

  addUserNotes(data:any):Observable<any>{
    return this._HttpClient.post(`${this._AuthService.baseURL}/addNote`,data);
  }

  updateUserNotes(data:any):Observable<any>{
    return this._HttpClient.put(`${this._AuthService.baseURL}/updateNote`,data);
  }

  deleteUserNotes(data:any):Observable<any>{
    let options={
      headers:new HttpHeaders({

      }),
      body:{
        NoteID:data.NoteID,
        token:data.token
      }
    }
    return this._HttpClient.delete(`${this._AuthService.baseURL}/deleteNote`,options);
  }

}
