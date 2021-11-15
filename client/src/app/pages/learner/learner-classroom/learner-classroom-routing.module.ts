import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LearnerClassroomComponent } from './learner-classroom.component';

const routes: Routes = [
  {
    path: '',
    component: LearnerClassroomComponent,
    children: [
      {
        path: 'test_list',
        outlet: 'conditionOutlet',
        loadChildren: () =>
          import('./test-list/test-list.module').then((m) => m.TestListModule),
      },
      {
        path: 'post_list',
        outlet: 'conditionOutlet',
        loadChildren: () =>
          import('./post-list/post-list.module').then((m) => m.PostListModule),
      },
      {
        path: 'lesson_list',
        outlet: 'conditionOutlet',
        loadChildren: () =>
          import('./lesson-list/lesson-list.module').then(
            (m) => m.LessonListModule
          ),
      },
      {
        path: 'asset_list',
        outlet: 'conditionOutlet',
        loadChildren: () =>
          import('./file-management/file-management.module').then(
            (m) => m.FileManagementModule
          ),
      },
      {
        path: 'chat_room',
        outlet: 'conditionOutlet',
        loadChildren: () =>
          import('./chat-room/chat-room.module').then((m) => m.ChatRoomModule),
      },
      {
        path: 'session_list',
        outlet: 'conditionOutlet',
        loadChildren: () =>
          import('./session-list/session-list.module').then(
            (m) => m.SessionListModule
          ),
      },
      {
        path: 'current_session',
        outlet: 'conditionOutlet',
        loadChildren: () =>
          import('./learner-streaming/learner-streaming.module').then(
            (m) => m.LearnerStreamingModule
          ),
      },
      {
        path: 'chat_room',
        outlet: 'conditionOutlet',
        loadChildren: () =>
          import('./learner-streaming/learner-streaming.module').then(
            (m) => m.LearnerStreamingModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LearnerClassroomRoutingModule {}
