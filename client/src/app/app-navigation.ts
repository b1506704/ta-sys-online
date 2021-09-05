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
    text: 'Instructor Schedule',
    icon: 'event',
    path: '/instructor_schedule',
  },
  {
    text: 'TASys Network',
    icon: 'like',
    items: [
      {
        text: 'Sub menu 1',
        path: '/bbbbbbb',
      },
      {
        text: 'Sub menu 2',
        path: '/ddddddd',
      },
    ],
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
        text: 'Sub menu 2',
        path: '/bbb',
      },
    ],
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
      },
      {
        text: 'Edit Learner',
        path: '/edit_learner_list',
      },
      {
        text: 'Edit Instructor',
        path: '/edit_instructor_list',
      },
    ],
  },
  {
    text: 'Edit Schedule',
    path: '/edit_schedule',
    icon: 'event',
  },
  {
    text: 'Edit Room',
    path: '/edit_room_list',
    icon: 'toolbox',
  },
  {
    text: 'Edit Bill',
    path: '/edit_bill_list',
    icon: 'cart',
  },
  {
    text: 'Edit Subject',
    path: '/edit_subject_list',
    icon: 'paste',
  },
  {
    text: 'Edit Course',
    path: '/edit_course_list',
    icon: 'copy',
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
