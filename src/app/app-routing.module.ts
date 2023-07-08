import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { AuthGuard } from './services/auth.guard';
import { HomeComponent } from './component/home/home.component';

const routes: Routes = [
  { path: 'signup', component: RegistrationComponent },
  { path : 'login', component: LoginComponent},
  { path: '**', component: HomeComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule], 
  providers: [AuthGuard]
})
export class AppRoutingModule { }
