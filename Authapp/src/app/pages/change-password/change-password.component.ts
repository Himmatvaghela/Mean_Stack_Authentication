import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent implements OnInit {
 constructor(private auth:AuthService,private route:Router){}


 changePassword=new FormGroup({
  password:new FormControl('',[Validators.required,Validators.minLength(2)])
 })

 ngOnInit(): void {
   if(!localStorage.getItem('userVerifiedForPasswordUpdate')){
    this.route.navigate(['/forget-password'])
   }
 }

 changeUserPassword(){
  if(this.changePassword.valid){
    
    const userEmail=localStorage.getItem('email')
    const finalValue={email:userEmail,password:this.changePassword.value.password}
    this.auth.changePassword(finalValue as {email:string,password:string})
    .subscribe((res)=>{
      console.log(res)
      localStorage.removeItem('email')
      localStorage.removeItem('userVerifiedForPasswordUpdate')
      this.route.navigate(['/login'])
    },(error)=>{
      console.log(error)
    })
    this.changePassword.reset()

  }else{
    let key=Object.keys(this.changePassword.controls)
    
    key.map(val=>{
      let control=this.changePassword.controls[val as keyof typeof this.changePassword.controls]
      if(control.errors){
        control.markAsTouched()
      }
    })

  }
 }
}
