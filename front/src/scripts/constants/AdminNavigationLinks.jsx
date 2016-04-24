import Paths from './PathsConstants';

const AdminNavigationLinks = [
  {
    label: 'Doctors',
    path: Paths.demo,
    active: true,
    children: [
      {
        label: 'Doctors list',
        path: Paths.demo,
        active: true
      },
    ]
  },
  {
    label: 'Patients',
    path: Paths.demo,
    active: true,
    children: [
      {
        label: 'Patients list',
        path: Paths.demo,
        active: true
      }
    ]
  },
  {
    label: 'Settings',
    children: [
      {
        label: 'My profile',
        path: Paths.demo,
        active: true
      },
      {
        label: 'My calendar',
        path: Paths.demo,
        active: true
      },
      {
        label: 'Logout',
        path: Paths.demo,
        active: true
      },
    ]
  },
  {
    label: 'Logout',
    path: Paths.demo,
    active: true
  }
];

export default AdminNavigationLinks;
