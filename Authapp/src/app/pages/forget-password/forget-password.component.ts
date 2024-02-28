import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent {
  constructor(private auth:AuthService,private route:Router){

  }

  forgetPassword= new FormGroup({
    email:new FormControl('',[Validators.required,Validators.email]),
  })

  forgetPasswordUser(){
    if(this.forgetPassword.valid){
      
      this.auth.forgetPassword(this.forgetPassword.value as {email:string}).subscribe((res:any)=>{
        if(res){
          alert(res.msg)
          localStorage.setItem('email',res.email)
          this.route.navigate(['/otp-verification'])
        }
      },(error)=>{
        console.log('error',error)
      })
      this.forgetPassword.reset()

    }else{
      let key=Object.keys(this.forgetPassword.controls)
      
      key.map(val=>{
        let control=this.forgetPassword.controls[val as keyof typeof this.forgetPassword.controls]
        if(control.errors){
          control.markAsTouched()
        }
      })
 
    }
  }
}
