import Paths from './PathsConstants';

const AdminNavigationLinks = [
  {
    label: 'Doctors',
    active: true,
    children: [
      {
        label: 'Doctors list',
        path: Paths.doctors.list,
        active: true
      },
      {
        label: 'Add Doctor',
        path: Paths.doctors.add,
        active: true
      }
    ]
  },
  {
    label: 'Patients',
    active: true,
    children: [
      {
        label: 'Patients list',
        path: Paths.patients.list,
        active: true
      },
      {
        label: 'Book visit',
        path: Paths.patients.bookVisit,
        active: true
      },
      {
        label: 'Add Patient',
        path: Paths.patients.add,
        active: true
      }
    ]
  },
  {
    label: 'Settings',
    children: [
      {
        label: 'My profile',
        path: Paths.settings.myProfile,
        active: true
      }
    ]
  },
  {
    label: 'Logout',
    path: Paths.settings.logout,
    active: true
  }
];

export default AdminNavigationLinks;
