import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { createUser } from '../../interface/auth';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  constructor(private auth:AuthService,private route:Router){}

  signUp= new FormGroup({
    name:new FormControl('',[Validators.required]),
    job:new FormControl('',[Validators.required]),
    email:new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl('',[Validators.required,Validators.minLength(2)]),
  })

  signUpUser(){
    if(this.signUp.valid){
      console.log(this.signUp.value)
      this.auth.register(this.signUp.value as createUser).subscribe((val:any)=>{
        console.log(val)
        localStorage.setItem('token',val.token)
        this.route.navigate(['/'])
      },(error)=>{
        if(error.error.error=='User Exist With This Email'){
          alert(error.error.error)
        }
      })
      this.signUp.reset()

    }else{
      let key=Object.keys(this.signUp.controls)
      
      key.map(val=>{
        let control=this.signUp.controls[val as keyof typeof this.signUp.controls]
        if(control.errors){
          control.markAsTouched()
        }
      })
 
    }
  }
}
