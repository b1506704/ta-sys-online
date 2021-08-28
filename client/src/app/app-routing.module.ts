import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DxDataGridModule, DxFormModule } from 'devextreme-angular';
import { AuthGuardService } from './shared/services/auth-guard.service';

const routes: Routes = [
  {
    path: 'learner_home',
    loadChildren: () =>
      import('./pages/learner/learner_home/learner-home.module').then(
        (m) => m.LearnerHomeModule
      ),
  },
  {
    path: 'instructor_list',
    loadChildren: () =>
      import('./pages/learner/instructor-list/instructor-list.module').then(
        (m) => m.InstructorListModule
      ),
  },
  {
    path: 'test_list',
    loadChildren: () =>
      import('./pages/learner/test-list/test-list.module').then(
        (m) => m.TestListModule
      ),
  },
  // {
  //   path: 'health_condition',
  //   loadChildren: () =>
  //     import('./pages/learner/health-condition/health-condition.module').then(
  //       (m) => m.HealthConditionModule
  //     ),
  //   canActivate: [AuthGuardService],
  // },
  // {
  //   path: 'medical_checkup',
  //   loadChildren: () =>
  //     import('./pages/learner/medical-checkup/medical-checkup.module').then(
  //       (m) => m.MedicalCheckupModule
  //     ),
  //   canActivate: [AuthGuardService],
  // },
  {
    path: 'instructor_schedule',
    loadChildren: () =>
      import('./pages/learner/schedule-list/schedule-list.module').then(
        (m) => m.ScheduleListModule
      ),
    canActivate: [AuthGuardService],
  },
  // instructor route
  {
    path: 'instructor_home',
    loadChildren: () =>
      import('./pages/instructor/instructor_home/instructor-home.module').then(
        (m) => m.InstructorHomeModule
      ),
  },
  // {
  //   path: 'edit_test_list',
  //   loadChildren: () =>
  //     import(
  //       './pages/instructor/edit-test-list/edit-test-list.module'
  //     ).then((m) => m.EditTestListModule),
  //   canActivate: [AuthGuardService],
  // },
  // {
  //   path: 'edit_lesson_list',
  //   loadChildren: () =>
  //     import('./pages/instructor/edit-lesson-list/edit-lesson-list.module').then(
  //       (m) => m.EditLessonListModule
  //     ),
  //   canActivate: [AuthGuardService],
  // },
  // {
  //   path: 'room_monitor',
  //   loadChildren: () =>
  //     import('./pages/instructor/room-monitor/room-monitor.module').then(
  //       (m) => m.RoomMonitorModule
  //     ),
  //   canActivate: [AuthGuardService],
  // },
  // {
  //   path: 'room/:id',
  //   loadChildren: () =>
  //     import(
  //       './pages/instructor/edit-health-condition-list/edit-health-condition-list.module'
  //     ).then((m) => m.EditHealthConditionModule),
  // },
  // {
  //   path: 'edit_medical_checkup_list',
  //   loadChildren: () =>
  //     import(
  //       './pages/instructor/edit-medical-checkup-list/edit-medical-checkup-list.module'
  //     ).then((m) => m.EditMedicalCheckupListModule),
  //   canActivate: [AuthGuardService],
  // },
  {
    path: 'schedule_list',
    loadChildren: () =>
      import('./pages/instructor/schedule-list/schedule-list.module').then(
        (m) => m.ScheduleListModule
      ),
    canActivate: [AuthGuardService],
  },
  // admin route
  {
    path: 'admin_home',
    loadChildren: () =>
      import('./pages/admin/admin-home/admin-home.module').then(
        (m) => m.AdminHomeModule
      ),
    canActivate: [AuthGuardService],
  },
  {
    path: 'edit_user_list',
    loadChildren: () =>
      import('./pages/admin/edit-user-list/edit-user-list.module').then(
        (m) => m.EditUserListModule
      ),
    canActivate: [AuthGuardService],
  },
  {
    path: 'edit_learner_list',
    loadChildren: () =>
      import('./pages/admin/edit-learner-list/edit-learner-list.module').then(
        (m) => m.EditLearnerModule
      ),
    canActivate: [AuthGuardService],
  },
  {
    path: 'edit_instructor_list',
    loadChildren: () =>
      import('./pages/admin/edit-instructor-list/edit-instructor-list.module').then(
        (m) => m.EditInstructorListModule
      ),
    canActivate: [AuthGuardService],
  },
  {
    path: 'edit_room_list',
    loadChildren: () =>
      import('./pages/admin/edit-room-list/edit-room-list.module').then(
        (m) => m.EditRoomListModule
      ),
    canActivate: [AuthGuardService],
  },
  {
    path: 'edit_bill_list',
    loadChildren: () =>
      import('./pages/admin/edit-bill-list/edit-bill-list.module').then(
        (m) => m.EditBillListModule
      ),
    canActivate: [AuthGuardService],
  },
  {
    path: 'edit_schedule',
    loadChildren: () =>
      import('./pages/admin/edit-schedule/edit-schedule.module').then(
        (m) => m.EditScheduleModule
      ),
    canActivate: [AuthGuardService],
  },
  {
    path: 'file_management',
    loadChildren: () =>
      import('./pages/admin/file-management/file-management.module').then(
        (m) => m.FileManagementModule
      ),
    canActivate: [AuthGuardService],
  },
  {
    path: 'statistics',
    loadChildren: () =>
      import('./pages/admin/statistics/statistics.module').then(
        (m) => m.StatisticsModule
      ),
    canActivate: [AuthGuardService],
  },
  // other
  {
    path: 'not_found',
    loadChildren: () =>
      import('./pages/not-found/not-found.module').then(
        (m) => m.NotFoundModule
      ),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('../app/shared/components/login/login.module').then(
        (m) => m.LoginModule
      ),
  },
  {
    path: 'signup',
    loadChildren: () =>
      import('./shared/components/sign-up/sign-up.module').then(
        (m) => m.SignUpModule
      ),
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./shared/components/profile/user-profile.module').then(
        (m) => m.UserProfileModule
      ),
  },
  // {
  //   path: '',
  //   pathMatch: 'full',
  //   redirectTo: 'instructor_home',
  // },
  {
    path: '**',
    redirectTo: 'not_found',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), DxDataGridModule, DxFormModule],
  exports: [RouterModule],
  declarations: [],
})
export class AppRoutingModule {}
