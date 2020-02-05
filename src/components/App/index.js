import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';

import ShowHotel from 'components/ShowHotel';
import SignIn from 'components/SignInForm';
import SignUp from 'components/SignUpForm';
import AddHotelForm from 'components/AddHotelForm';
import Dashboard from 'components/Dashboard';

class App extends React.Component {
  render() {
    return (
      <>
        <CssBaseline />
        <Switch>
          <Route path='/signin'>
            <SignIn />
          </Route>
          <Route path='/signup'>
            <SignUp />
          </Route>
          <Route path='/hotels/:id'>
            <ShowHotel />
          </Route>
          <Route path='/add-hotel-form'>
            <AddHotelForm />
          </Route>
          <Route path='/'>
            <Dashboard />
          </Route>
        </Switch>
      </>
    );
  }
}

export default App;
