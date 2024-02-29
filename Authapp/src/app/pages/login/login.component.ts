import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { loginUser } from '../../interface/auth';
import { Router } from '@angular/router';
import { LoggerService } from '../../services/logger.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  constructor(
    private auth:AuthService,
    private route:Router,
    private logger:LoggerService
    ){

  }
  ngOnInit(): void {
    if(localStorage.getItem('token')){
      this.route.navigate(['/'])
    }
  }

  signIn= new FormGroup({
    email:new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl('',[Validators.required,Validators.minLength(2)]),
  })

  signInUser(){
    if(this.signIn.valid){
      this.auth.login(this.signIn.value as loginUser).subscribe((val:any)=>{
        localStorage.setItem('token',val.token)
        this.route.navigate(['/'])
      },(error)=>{
        // alert(error.error.msg)
        this.logger.logError(error)
      })
      this.signIn.reset()

    }else{
      let key=Object.keys(this.signIn.controls)
      
      key.map(val=>{
        let control=this.signIn.controls[val as keyof typeof this.signIn.controls]
        if(control.errors){
          control.markAsTouched()
        }
      })
 
    }
  }
  
}
