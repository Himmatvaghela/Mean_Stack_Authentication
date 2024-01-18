import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { createUser } from '../interface/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  register(data:createUser){
    return this.http.post('http://localhost:3040/auth/register',data)
  }
}
