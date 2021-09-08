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
  // instructor route
  {
    path: 'instructor_home',
    loadChildren: () =>
      import('./pages/instructor/instructor_home/instructor-home.module').then(
        (m) => m.InstructorHomeModule
      ),
    canActivate: [AuthGuardService],
  },
  {
    path: 'instructor_streaming',
    loadChildren: () =>
      import(
        './pages/instructor/instructor_streaming/instructor-streaming.module'
      ).then((m) => m.InstructorStreamingModule),
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
    path: 'edit_user_info_list',
    loadChildren: () =>
      import(
        './pages/admin/edit-user-info-list/edit-user-info-list.module'
      ).then((m) => m.EditUserInfoModule),
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
    path: 'edit_subject_list',
    loadChildren: () =>
      import('./pages/admin/edit-subject-list/edit-subject-list.module').then(
        (m) => m.EditSubjectListModule
      ),
    canActivate: [AuthGuardService],
  },
  {
    path: 'edit_course_list',
    loadChildren: () =>
      import('./pages/admin/edit-course-list/edit-course-list.module').then(
        (m) => m.EditCourseListModule
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
  // visitor
  {
    path: 'landing_page',
    loadChildren: () =>
      import('./pages/visitor/landing-page/landing-page.module').then(
        (m) => m.LandingPageModule
      ),
  },
  {
    path: 'instructor_list',
    loadChildren: () =>
      import('./pages/visitor/instructor-list/instructor-list.module').then(
        (m) => m.InstructorListModule
      ),
  },
  {
    path: 'course_list',
    loadChildren: () =>
      import('./pages/visitor/course-list/course-list.module').then(
        (m) => m.CourseListModule
      ),
  },
  {
    path: 'subject_list',
    loadChildren: () =>
      import('./pages/visitor/subject-list/subject-list.module').then(
        (m) => m.SubjectListModule
      ),
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
    canActivate: [AuthGuardService],
  },
  {
    path: 'splash_screen',
    loadChildren: () =>
      import('./shared/components/splash_screen/splash-screen.module').then(
        (m) => m.SplashScreenModule
      ),
  },
  {
    path: '',
    redirectTo: '/splash_screen',
    pathMatch: 'full',
  },
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
