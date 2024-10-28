import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MembersComponent } from './members/members.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RegisterMemberComponent } from './members/register-member/register-member.component';
import { EditMemberComponent } from './members/edit-member/edit-member.component';
import { HomeComponent } from './home/home.component';

import { TrainersComponent } from './trainers/trainers.component';
import { RegisterTrainerComponent } from './trainers/register-trainer/register-trainer.component';
import { EditTrainerComponent } from './trainers/edit-trainer/edit-trainer.component';
import { ClassesComponent } from './classes/classes.component';
import { CreateClassComponent } from './classes/create-class/create-class.component';
import { EditClassComponent } from './classes/edit-class/edit-class.component';
import { LoginComponent } from './authentication/login/login.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner.component';


const appRoutes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'signup', component: SignupComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'members', component: MembersComponent
  },
  {
    path: 'trainers', component: TrainersComponent
  },
  {
    path: 'classes', component: ClassesComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MembersComponent,
    RegisterMemberComponent,
    EditMemberComponent,
    HomeComponent,
    TrainersComponent,
    RegisterTrainerComponent,
    EditTrainerComponent,
    ClassesComponent,
    CreateClassComponent,
    EditClassComponent,
    LoginComponent,
    LoadingSpinnerComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
    RouterModule.forRoot(appRoutes),
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
