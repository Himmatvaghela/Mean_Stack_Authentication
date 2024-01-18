import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  signIn= new FormGroup({
    email:new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl('',[Validators.required,Validators.minLength(2)]),
  })

  signInUser(){
    if(this.signIn.valid){
      console.log(this.signIn.value)
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
