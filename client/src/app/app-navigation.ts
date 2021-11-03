export const navigationLearner = [
  {
    text: 'Home',
    path: '/learner_home',
    icon: 'home',
  },
  {
    text: 'Help Center',
    icon: 'help',
    items: [
      {
        text: 'Instructor',
        path: '/instructor_list',
      },
      {
        text: 'Subject',
        path: '/subject_list',
      },
    ],
  },
  {
    text: 'Cart List',
    icon: 'cart',
    path: '/cart_list',
  },
  {
    text: 'Course List',
    icon: 'product',
    path: '/learner_course_list',
  },
  {
    text: 'Classroom',
    icon: 'group',
    path: '/learner_course',
  },
  {
    text: 'Schedule List',
    icon: 'event',
    path: '/schedule_list',
  },
];

export const navigationInstructor = [
  {
    text: 'Home',
    path: '/instructor_home',
    icon: 'home',
  },
  {
    text: 'Manage Course',
    icon: 'edit',
    items: [
      {
        text: 'Edit Test',
        path: '/edit_test_list',
      },
      {
        text: 'Edit Lesson',
        path: '/edit_lesson_list',
      },
    ],
  },
  {
    text: 'Live Streaming',
    icon: 'like',
    items: [
      {
        text: 'Current Session',
        path: '/instructor_streaming',
      },
      {
        text: 'Session List',
        path: '/instructor_session',
      },
    ],
  },
  {
    text: 'Course List',
    icon: 'edit',
    path: '/course_instructor',
  },
  {
    text: 'Schedule List',
    icon: 'event',
    path: '/schedule_list',
  },
];
export const navigationAdmin = [
  {
    text: 'Home',
    path: '/admin_home',
    icon: 'home',
  },
  {
    text: 'User',
    icon: 'user',
    items: [
      {
        text: 'Edit User',
        path: '/edit_user_list',
      }      
    ],
  },
  {
    text: 'Finance',
    icon: 'money',
    items: [     
      {
        text: 'Edit Cart',
        path: '/edit_cart_list',
      },     
    ],
  },
  {
    text: 'Classroom',
    icon: 'group',
    items: [
      {
        text: 'Edit Post',
        path: '/edit_post_list',
      },
      {
        text: 'Edit Comment',
        path: '/edit_comment_list',
      },
      {
        text: 'Edit Message',
        path: '/edit_message_list',
      },
    ],
  },
  {
    text: 'Session',
    path: '/edit_session_list',
    icon: 'globe',
  },
  {
    text: 'Subject',
    icon: 'product',
    items: [
      {
        text: 'Edit Subject',
        path: '/edit_subject_list',
      },
      {
        text: 'Edit Curriculum',
        path: '/edit_curriculum_list',
      },
      {
        text: 'Edit Course',
        path: '/edit_course_list',
      },
      {
        text: 'Edit Test',
        path: '/edit_test_list',
      },
      {
        text: 'Edit Question',
        path: '/edit_question_list',
      },
      {
        text: 'Edit Answer',
        path: '/edit_answer_list',
      },
      {
        text: 'Edit Lesson',
        path: '/edit_lesson_list',
      },
    ],
  },
  {
    text: 'File Storage',
    path: '/file_management',
    icon: 'file',
  },
  {
    text: 'Statistics',
    path: '/statistics',
    icon: 'chart',
  },
];
export const navigationNonUser = [
  {
    text: '',
    path: '',
  },
];
