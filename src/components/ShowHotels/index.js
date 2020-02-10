import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';
import { Container } from '@material-ui/core';

import { isAuthError } from 'helpers';
import Hotel from 'components/Hotel';
import { fragments as showHotelFragments } from 'components/ShowHotel';
import { Wrapper, Title } from './styles';

const USER_FRAGMENT = gql`
  fragment UserFragment on UserType {
    id
    email
    firstName
    lastName
  }
`;

const HOTELS_FRAGMENT = gql`
  fragment HotelsFragment on Query {
    hotels {
      edges {
        node {
          ...HotelFragment
        }
      }
    }
  }
  ${showHotelFragments.hotel}
`;

const GET_HOTELS = gql`
  {
    ...HotelsFragment
    me {
      ...UserFragment
    }
  }
  ${USER_FRAGMENT}
  ${HOTELS_FRAGMENT}
`;

const ShowHotels = () => {
  const history = useHistory();
  const { loading, error, data } = useQuery(GET_HOTELS);

  if (isAuthError(error)) {
    history.push('/signin');
  }

  return !loading && !error && (
    <Container component="main" maxWidth="sm">
      <Wrapper>
        <Title>Listings</Title>
        {data.hotels.edges.map(({ node }) => (
          <Hotel
            {...{
              ...node,
              key: node.id,
            }}
          />
        ))}
      </Wrapper>
    </Container>
  );
};

export const fragments = {
  user: USER_FRAGMENT,
  hotels: HOTELS_FRAGMENT,
};

export default ShowHotels;
