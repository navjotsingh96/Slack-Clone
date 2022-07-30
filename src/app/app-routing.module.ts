import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatRoomComponent } from './chat-room/chat-room.component';
import { HomeComponent } from './home/home.component';
import { ThreadComponent } from './thread/thread.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LoginComponent } from './log-in/log-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { canActivate, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';
import { PageListComponent } from './page-list/page-list.component';
import { child } from 'firebase/database';
import { ProfileComponent } from './profile/profile.component';

const redirectToLogin = () => redirectUnauthorizedTo(['login']);
const redirectTooHome = () => redirectLoggedInTo(['page-list']);
const routes: Routes = [

  { path: '', component: HomeComponent, ...canActivate(redirectToLogin) },

  { path: 'home', component: HomeComponent, ...canActivate(redirectToLogin) },

  { path: 'profile', component: ProfileComponent, ...canActivate(redirectToLogin) },  

  { path: 'chat', component: ChatRoomComponent, ...canActivate(redirectToLogin) },

  { path: 'chat/:id', component: ChatRoomComponent, ...canActivate(redirectToLogin) },

  { path: 'chat/:id/thread/:id', component: ThreadComponent, ...canActivate(redirectToLogin) },

  { path: 'theard', component: ThreadComponent, ...canActivate(redirectToLogin) },

  { path: 'login', component: LoginComponent, ...canActivate(redirectTooHome) },

  { path: 'sign-up', component: SignUpComponent, },

 

  


  // { path: '', redirectTo: 'page-list', pathMatch: 'full'},
  // { path: '', component: PageListComponent, children: [
  //   { path: 'home', component: HomeComponent,  outlet: "page-list" },
  //   { path: 'chat/:id', component: ChatRoomComponent, outlet: "page-list" },
  // ], ...canActivate(redirectToLogin) },
  // { path: 'theard', component: ThreadComponent, ...canActivate(redirectToLogin) },
  // { path: 'sidebar', component: SidebarComponent},
  // { path: '', component: LoginComponent },
  // {
  //   path: 'chat', component: ChatRoomComponent
  //   , canActivate: [canActivate(redirectToLogin)]
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
