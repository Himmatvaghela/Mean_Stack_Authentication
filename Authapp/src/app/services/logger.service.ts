import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  constructor() { }

  logError(error:any){
    let err= 
      error?.error?.error_description ||
      error?.error?.detail ||
      error?.error?.message || 
      error?.error?.msg ||
      error?.error?.error ||
      error?.error ||
      'Oops something went wrong';

    if(typeof(err) !== 'string'){
      err=err.join('. <br>');
    }

    Swal.fire({
      icon:'error',
      title:'Error',
      text: err,
      confirmButtonColor: '#397fc2',
      heightAuto:false,
    })
  }
}
