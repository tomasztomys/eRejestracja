import React from 'react';
import {
  Router,
  Route,
  Redirect,
  browserHistory
} from 'react-router';
import localStorage from 'store';
import Paths from '../constants/PathsConstants';

import App from './App';

import { SmartLogin } from './views/login';
import { Navigation } from './views/navigation';
import {
  SmartDoctorsList,
  SmartPatientsList
} from './views/entity_lists/smarts';

import { Demo } from './views/demo';
import { SmartMainLayout } from './views/layouts/main_layout';
import { EmptyPage } from './views/empy_page';
import {
  SmartDoctorRegistration,
  SmartPatientRegistration,
  SmartAddDoctor,
  SmartAddPatient,
  SmartProfileEdition
} from './views/person_edition/smarts';
import { MainSite } from './views/main_site'

import { SmartPatientBookVisit } from './views/book_visit/smarts';

export default class Routes extends React.Component {
  _redirectIfUserIsNotLogged(nextState, replace) {
    if (!localStorage.get('user')) {
      replace(
        { pathname: Paths.login, state:
          { nextPathname: nextState.location.pathname }
        }
      );
    }
  }

  _redirectIfUserIsLogged(nextState, replace) {
    if (localStorage.get('user')) {
      replace({ pathname: Paths.root });
    }
  }

  render() {
    let registeredSection = (
      <Route
        component={ SmartMainLayout }
        onEnter={ this._redirectIfUserIsNotLogged }
      >
        <Route path={ Paths.doctors.list }
          component={ SmartDoctorsList }
        />
        <Route path={ Paths.patients.list }
          component={ SmartPatientsList }
        />
        <Route path={ Paths.patients.bookVisit }
          component={ SmartPatientBookVisit }
        />
        <Route path={ Paths.patients.add }
          component={ SmartAddPatient }
        />
        <Route path={ Paths.doctors.add }
          component={ SmartAddDoctor }
        />
        <Route path={ Paths.settings.myProfile }
          component={ SmartProfileEdition }
        />
        <Route path={ Paths.settings.logout }
          component={ EmptyPage }
        />
      </Route>
    );

    return (
      <Router history={ browserHistory }>
        <Route
          component={ App }
        >
          <Route
            path={ Paths.root }
            component={ MainSite }
          />
          <Route
            path={ Paths.navigation }
            component={ Navigation }
          />
          <Route
            path={ Paths.login }
            component={ SmartLogin }
            onEnter={ this._redirectIfUserIsLogged }
          />
          <Route
            path={ Paths.demo }
            component={ Demo }
          />
          <Route
            path={ Paths.doctors.registration }
            component={ SmartDoctorRegistration }
          />
          <Route
            path={ Paths.patients.registration }
            component={ SmartPatientRegistration }
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
