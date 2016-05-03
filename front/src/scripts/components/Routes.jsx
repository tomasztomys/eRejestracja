import React from 'react';
import {
  Router,
  Route,
  Redirect,
  browserHistory
} from 'react-router';
import Paths from '../constants/PathsConstants';

import App from './App';

import { SmartLogin } from './views/login';
import { Navigation } from './views/navigation';
import {
  SmartDoctorsList,
  SmartPatientsList
} from './views/entity_lists/smarts';

import { Demo } from './views/demo';
import { MainLayout } from './views/layouts/main_layout';
import { EmptyPage } from './views/empy_page';
import { SmartAdminProfileEdition } from './views/person_edition/smarts';

export default class Routes extends React.Component {

  render() {
    let registeredSection = (
      <Route component={ MainLayout } >
        <Route path={ Paths.doctors.list }
          component={ SmartDoctorsList }
        />
        <Route path={ Paths.patients.list }
          component={ SmartPatientsList }
        />
        <Route path={ Paths.settings.myProfile }
          component={ SmartAdminProfileEdition }
        />
        <Route path={ Paths.settings.logout }
          component={ EmptyPage }
        />
      </Route>
    );

    return (
      <Router history={ browserHistory }>
        <Redirect
          from={ Paths.root }
          to={ Paths.navigation }
        />
        <Route
          path={ Paths.root }
          component={ App }
        >
          <Route
            path={ Paths.navigation }
            component={ Navigation }
          />
          <Route
            path={ Paths.login }
            component={ SmartLogin }
          />
          <Route
            path={ Paths.demo }
            component={ Demo }
          />
          { registeredSection }
        </Route>
        <Redirect
          from={ Paths.notFound }
          to={ Paths.root }
        />
      </Router>
    );
  }
}
