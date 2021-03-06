const Paths = {
  root: '/',
  dashboard: '/dashboard',
  notFound: '*',
  navigation: '/navigation',
  login: '/login',
  resetPassword: '/reset-password',
  demo: '/demo',
  userPanel: '/testingUserPanel',
  doctorsList: '/doctors-list',
  visits: '/visits',
  patients: {
    list: '/patients-list',
    bookVisit: '/book-visit',
    registration: '/patient-registration',
    add: '/add-patient',
    edition: '/patient-edition/:id'
  },
  doctors: {
    list: '/doctors-list',
    bookVisit: '/set-patient-to-visit',
    registration: '/doctor-registration',
    add: '/add-doctor',
    edition: '/doctor-edition/:id',
    workHours: '/doctor-work-hours'
  },
  contact: '/contact',
  contactEdition: '/contact-edition',
  settings: {
    myProfile: '/my-profile',
    logout: '/logout'
  }
};

export default Paths;