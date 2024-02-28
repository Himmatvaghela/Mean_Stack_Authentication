import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './services/auth-guard.service';
import { OTPComponent } from './pages/otp/otp.component';
import { ForgetPasswordComponent } from './pages/forget-password/forget-password.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';

const routes: Routes = [
  
  {
    path:'',
    component:HomeComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'register',
    component:RegisterComponent
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'otp-verification',
    component:OTPComponent
  },
  {
    path:'forget-password',
    component:ForgetPasswordComponent
  },
  {
    path:'change-password',
    component:ChangePasswordComponent
  },
  {
    path:'**',
    redirectTo:'/login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
