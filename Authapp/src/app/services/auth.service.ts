import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { createUser, loginUser } from '../interface/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  register(data:createUser){
    return this.http.post('http://localhost:3040/auth/register',data)
  }

  login(data:loginUser){
    return this.http.post('http://localhost:3040/auth/login',data)
  }

  
  forgetPassword(data:{email:string}){
    return this.http.post('http://localhost:3040/auth/forget-password',data)
  }

  forgetPasswordOtpVerification(data:{email:string,code:number}){
    return this.http.post('http://localhost:3040/auth/forgetPasswordCodeVerification',data)
  }

  changePassword(data:{email:string,password:string}){
    return this.http.patch('http://localhost:3040/auth/changePassword',data)
  }
}
