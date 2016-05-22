import Paths from './PathsConstants';

const MenuNavigationLinks = [
  {
    label: 'Doctors',
    active: true,
    access: [ 'admin' ],
    children: [
      {
        label: 'Doctors list',
        path: Paths.doctors.list,
        active: true,
        access: [ 'admin' ]
      },
      {
        label: 'Add Doctor',
        path: Paths.doctors.add,
        active: true,
        access: [ 'admin' ]
      }
    ]
  },
  {
    label: 'Visits',
    active: true,
    access: [ 'doctor' ],
    children: [
      {
        label: 'Work hours',
        path: Paths.doctors.workHours,
        active: true,
        access: [ 'doctor' ]
      },
    ]
  },
  {
    label: 'Patients',
    active: true,
    access: [ 'admin', 'doctor', 'patient' ],
    children: [
      {
        label: 'Patients list',
        path: Paths.patients.list,
        active: true,
        access: [ 'admin', 'doctor' ]
      },
      {
        label: 'Book visit',
        path: Paths.patients.bookVisit,
        active: true,
        access: [ 'admin', 'doctor', 'patient' ]
      },
      {
        label: 'Add Patient',
        path: Paths.patients.add,
        active: true,
        access: [ 'admin' ]
      }
    ]
  },
  {
    label: 'Settings',
    access: [ 'admin', 'doctor', 'patient' ],
    children: [
      {
        label: 'My profile',
        path: Paths.settings.myProfile,
        active: true
      }
    ]
  },
];

export default MenuNavigationLinks;
