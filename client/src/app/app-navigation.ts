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
        text: 'Test',
        path: '/test_list',
      },
    ],
  },
  {
    text: 'Instructor Schedule',
    icon: 'event',
    path: '/instructor_schedule',
  },
  {
    text: 'Heath Care',
    icon: 'like',
    items: [
      {
        text: 'Health Condition',
        path: '/health_condition',
      },
      {
        text: 'Medical Checkup',
        path: '/medical_checkup',
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
    text: 'Medical',
    icon: 'filter',
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
    text: 'Heath Care',
    icon: 'like',
    items: [
      {
        text: 'Monitor Patient',
        path: '/room_monitor',
      },
      {
        text: 'Edit Medical Checkup',
        path: '/edit_medical_checkup_list',
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
    text: 'Image Storage',
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
