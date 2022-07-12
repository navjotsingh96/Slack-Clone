import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatRoomComponent } from './chat-room/chat-room.component';
import { HomeComponent } from './home/home.component';
import { ThreadComponent } from './thread/thread.component';
import { SidebarComponent } from './sidebar/sidebar.component';
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'chat', component: ChatRoomComponent },
  { path: 'theard', component: ThreadComponent },
  { path: 'sidebar', component: SidebarComponent }



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
