import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatRoomComponent } from './chat-room/chat-room.component';
import { HomeComponent } from './home/home.component';
import { ThreadComponent } from './thread/thread.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LoginComponent } from './login/login/login.component';
import { SignUpComponent } from './login/sign-up/sign-up.component';
import {canActivate, redirectUnauthorizedTo, redirectLoggedInTo} from '@angular/fire/auth-guard'; 

const redirectToLogin = () => redirectUnauthorizedTo(['login']);
const redirectTooHome = () => redirectLoggedInTo(['home']);
const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'chat', component: ChatRoomComponent
    , canActivate: [canActivate(redirectToLogin)] },
  { path: 'theard', component: ThreadComponent },
  { path: 'sidebar', component: SidebarComponent },

  {
    path: 'login',
    component: LoginComponent,
    ...canActivate(redirectTooHome) // redirects to home if logged in
  },
  {
    path: 'login/sign-up',
    component: SignUpComponent,
    ...canActivate(redirectTooHome)   // redirectToLogin if 
  },

  {
    path: 'home',
    component: HomeComponent,
    ...canActivate(redirectToLogin) // redirect to login if not logged in
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
