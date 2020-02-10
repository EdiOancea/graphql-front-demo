import React from 'react';
import { useHistory } from 'react-router-dom';
import { useApolloClient } from '@apollo/react-hooks';

import AppBar from 'components/AppBar';
import ShowHotels from 'components/ShowHotels';

const Dashboard = () => {
  const history = useHistory();
  const client = useApolloClient();
  const logout = () => client.clearStore().then(() => {
    localStorage.clear();
    history.push('/signin');
  });

  return (
    <>
      <AppBar
        {...{
          title: 'Dashboard',
          actions: [
            { onClick: logout, buttonText: 'Log out' },
            { onClick: () => history.push('/add-hotel-form'), buttonText: 'Add Hotel' },
          ],
        }}
      />
      <ShowHotels />
    </>
  );
}

export default Dashboard;
