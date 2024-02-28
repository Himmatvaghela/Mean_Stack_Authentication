import { AfterViewInit, Component, OnInit, } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrl: './otp.component.scss'
})
export class OTPComponent implements OnInit, AfterViewInit{
constructor(private auth:AuthService,private route:Router){}
  

  otpVal=new FormGroup({
    formarr:new FormArray([
      new FormControl(),
      new FormControl(),
      new FormControl(),
      new FormControl()
    ])
  }) 

  ngOnInit(): void {
    if(!localStorage.getItem('email')){
      this.route.navigate(['/forget-password'])
    }
  }

  ngAfterViewInit(): void {
    // Set focus on the first input field after the view has been initialized
    this.inputFocus(0)
  }

  goToNextInput(event:any,i:number,val:any){
    //moving input focus ahead and behind based on this condition
    const valIntoNum=Number(val)
    if(val==''){
      return
    }
    if(this.getFormControl(i).value && i < 4){
      this.inputFocus(i+1)
    }

    //jump to empty field
    if(i<3 && this.getFormControl(i+1).value){
      this.inputFocus(this.formarr.value.indexOf(''))
    }


    //to get latest value in input
    this.formarr.controls[i].patchValue(val.substring(val.length-1))
  }

  goToPreviousInput(event:any,i:number,val:string){
    if(event.key=='Backspace' && i >0 && !this.getFormControl(i).value){
      this.inputFocus(i-1)
    }
  }

  handleClick(event:any,i:number){
    //move cursor to last in input 
    event.target.setSelectionRange(1,1)

    //optional jump to empty field back
    if(i>0 && !this.getFormControl(i-1).value){
      this.inputFocus(this.formarr.value.indexOf(''))
    }
    if(i>1 && !this.getFormControl(i-2).value){
      this.inputFocus(this.formarr.value.indexOf(''))
    }
    if(i>2 && !this.getFormControl(i-3).value){
      this.inputFocus(this.formarr.value.indexOf(''))
    }
  }

  inputFocus(i:number){
    //logic for input focus
    const firstInputElement = this.formarr.controls[i];
    if (firstInputElement) {
      const inputElement = document.getElementById(`input-${i}`);
      if (inputElement) {
        inputElement.focus();
      }
    }
  }

  get formarr(): FormArray {
    return this.otpVal.get('formarr') as FormArray;
  }

  getFormControl(index: number): any {
    return this.formarr.controls[index];
  }

  get dissableBtn(){
    return this.formarr.value.join('').length>3;
  }

  otpSubmit(){
    const otpValue=Number(this.formarr.value.join(''))
    const userEmail=localStorage.getItem('email')
    const finalValue={email:userEmail,code:otpValue}
    this.auth.forgetPasswordOtpVerification(finalValue as {email:string,code:number})
    .subscribe((res)=>{
      localStorage.setItem('userVerifiedForPasswordUpdate','true')
      this.route.navigate(['/change-password'])
      console.log('res',res)
    },(error)=>{
      alert(error.error)
    })
    this.otpVal.reset()
  }
}
