import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DxDataGridModule, DxFormModule } from 'devextreme-angular';
import { AuthGuardService } from './shared/services/auth-guard.service';

const routes: Routes = [
  {
    path: 'learner_home',
    loadChildren: () =>
      import('./pages/learner/learner-home/learner-home.module').then(
        (m) => m.LearnerHomeModule
      ),
  },
  {
    path: 'cart_list',
    loadChildren: () =>
      import('./pages/learner/cart-list/cart-list.module').then(
        (m) => m.CartListModule
      ),
  },
  {
    path: 'learner_course_list',
    loadChildren: () =>
      import('./pages/learner/course-list/course-list.module').then(
        (m) => m.CourseListModule
      ),
  },
  {
    path: 'learner_course',
    loadChildren: () =>
      import('./pages/learner/learner-course/course-list.module').then(
        (m) => m.CourseListModule
      ),
  },
  // instructor route
  {
    path: 'instructor_home',
    loadChildren: () =>
      import('./pages/instructor/instructor-home/instructor-home.module').then(
        (m) => m.InstructorHomeModule
      ),
    canActivate: [AuthGuardService],
  },
  {
    path: 'course_instructor',
    loadChildren: () =>
      import('./pages/instructor/course-list/course-list.module').then(
        (m) => m.CourseListModule
      ),
    canActivate: [AuthGuardService],
  },
  {
    path: 'instructor_session',
    loadChildren: () =>
      import('./pages/instructor/session-list/session-list.module').then(
        (m) => m.SessionListModule
      ),
  },
  {
    path: 'course_streaming/:id',
    loadChildren: () =>
      import(
        './pages/instructor/instructor-streaming/instructor-streaming.module'
      ).then((m) => m.InstructorStreamingModule),
  },
  {
    path: 'course_classroom/:courseId',
    loadChildren: () =>
      import(
        './pages/instructor/instructor-classroom/instructor-classroom.module'
      ).then((m) => m.InstructorClassroomModule),
  },
  {
    path: 'instructor_streaming',
    loadChildren: () =>
      import(
        './pages/instructor/instructor-streaming/instructor-streaming.module'
      ).then((m) => m.InstructorStreamingModule),
    canActivate: [AuthGuardService],
  },
  {
    path: 'schedule_list',
    loadChildren: () =>
      import('./pages/instructor/schedule-list/schedule-list.module').then(
        (m) => m.ScheduleListModule
      ),
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
    path: 'edit_session_list',
    loadChildren: () =>
      import('./pages/admin/edit-session-list/edit-session-list.module').then(
        (m) => m.EditSessionListModule
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
    path: 'edit_lesson_list',
    loadChildren: () =>
      import('./pages/admin/edit-lesson-list/edit-lesson-list.module').then(
        (m) => m.EditLessonListModule
      ),
    canActivate: [AuthGuardService],
  },
  {
    path: 'edit_test_list',
    loadChildren: () =>
      import('./pages/admin/edit-test-list/edit-test-list.module').then(
        (m) => m.EditTestListModule
      ),
    canActivate: [AuthGuardService],
  },
  {
    path: 'edit_question_list',
    loadChildren: () =>
      import('./pages/admin/edit-question-list/edit-question-list.module').then(
        (m) => m.EditQuestionListModule
      ),
    canActivate: [AuthGuardService],
  },
  {
    path: 'edit_answer_list',
    loadChildren: () =>
      import('./pages/admin/edit-answer-list/edit-answer-list.module').then(
        (m) => m.EditAnswerListModule
      ),
    canActivate: [AuthGuardService],
  },
  {
    path: 'edit_curriculum_list',
    loadChildren: () =>
      import(
        './pages/admin/edit-curriculum-list/edit-curriculum-list.module'
      ).then((m) => m.EditCurriculumListModule),
    canActivate: [AuthGuardService],
  },
  {
    path: 'edit_cart_list',
    loadChildren: () =>
      import('./pages/admin/edit-cart-list/edit-cart-list.module').then(
        (m) => m.EditCartListModule
      ),
    canActivate: [AuthGuardService],
  },
  {
    path: 'edit_post_list',
    loadChildren: () =>
      import('./pages/admin/edit-post-list/edit-post-list.module').then(
        (m) => m.EditPostListModule
      ),
    canActivate: [AuthGuardService],
  },
  {
    path: 'edit_comment_list',
    loadChildren: () =>
      import('./pages/admin/edit-comment-list/edit-comment-list.module').then(
        (m) => m.EditCommentListModule
      ),
    canActivate: [AuthGuardService],
  },
  {
    path: 'edit_message_list',
    loadChildren: () =>
      import('./pages/admin/edit-message-list/edit-message-list.module').then(
        (m) => m.EditMessageListModule
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
