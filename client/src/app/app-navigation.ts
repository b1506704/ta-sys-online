export const navigationLearner = [
  {
    text: 'Classroom',
    icon: 'group',
    path: '/learner_course',
  },
  {
    text: 'Instructor',
    icon: 'user',
    path: '/learner_instructor_list',
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
    text: 'Schedule List',
    icon: 'event',
    path: '/learner_schedule_list',
  },
];

export const navigationInstructor = [
  {
    text: 'Course Management',
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
    text: 'User',
    icon: 'user',
    items: [
      {
        text: 'Edit User',
        path: '/edit_user_list',
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
];
export const navigationNonUser = [
  {
    text: 'Instructor List',
    path: '/visiter_instructor_list',
    icon: 'user',
  },
  {
    text: 'Course List',
    path: '/visitor_course_list',
    icon: 'edit',
  },
];
