import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';

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

  return !loading && !error && (
    <Wrapper>
      <Title>Hotels</Title>
      {data.hotels.edges.map(({ node }) => (
        <Hotel
          {...{
            ...node,
            key: node.id,
          }}
        />
      ))}
      <button onClick={() => history.push('/add-hotel-form')}>Add Hotel</button>
    </Wrapper>
  );
};

export const fragments = {
  user: USER_FRAGMENT,
  hotels: HOTELS_FRAGMENT,
};

export default ShowHotels;
