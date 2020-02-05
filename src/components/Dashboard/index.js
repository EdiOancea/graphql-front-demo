import React from 'react';
import { useHistory } from 'react-router-dom';
import { useApolloClient } from '@apollo/react-hooks';

import ShowHotels from 'components/ShowHotels';
import { Wrapper, Title } from './styles';

const Dashboard = () => {
  const history = useHistory();
  const client = useApolloClient();
  const logout = () => client.clearStore().then(() => {
    localStorage.clear();
    history.push('/signin');
  });

  return (
    <Wrapper>
      <Title>Dashboard</Title>
      <ShowHotels />
      <button onClick={logout} >
        Log out
      </button>
    </Wrapper>
  );
}

export default Dashboard;
