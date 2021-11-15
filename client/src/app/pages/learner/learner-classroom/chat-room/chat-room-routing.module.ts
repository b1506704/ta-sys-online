import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatRoomComponent } from './chat-room.component';

const routes: Routes = [
  {
    path: '',
    component: ChatRoomComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatRoomRoutingModule {}
