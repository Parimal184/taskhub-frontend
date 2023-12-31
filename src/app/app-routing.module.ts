import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { AuthGuard } from './services/auth.guard';
import { HomeComponent } from './component/home/home.component';
import { TaskComponent } from './component/task/task.component';
import { NavbarComponent } from './component/navbar/navbar.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: RegistrationComponent },
  {
    path: '', component: NavbarComponent,
    children: [
      { path: '', redirectTo: 'tasks/', pathMatch: 'full' },
      { path: 'tasks', redirectTo: 'tasks/', pathMatch: 'full' },
      { path: 'tasks/:status', component: HomeComponent },
      { path: 'task/add', component: TaskComponent },
      { path: 'task/edit/:id', component: TaskComponent },
      { path: 'task/delete/:id', component: TaskComponent }
    ],
    canActivate: [AuthGuard]
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
