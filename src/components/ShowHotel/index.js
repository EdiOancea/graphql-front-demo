import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';

import AppBar from 'components/AppBar';

const GET_HOTEL_FRAGMENT = gql`
  fragment HotelFragment on HotelType {
    id
    name
    description
    location
    roomCount
    postedBy {
      email
    }
  }
`;

const GET_HOTEL_COMMENTS_FRAGMENT = gql`
  fragment CommentFragment on CommentType {
    id
    content
  }
`;

const GET_HOTEL = gql`
  query GetHotel($id: ID!) {
    hotel(id: $id) {
      ...HotelFragment
      comments {
        edges {
          node {
            ...CommentFragment
          }
        }
      }
    }
    me {
      email
    }
  }
  ${GET_HOTEL_FRAGMENT}
  ${GET_HOTEL_COMMENTS_FRAGMENT}
`;

const DELETE_HOTEL = gql`
  mutation DeleteHotel($id: ID!) {
    deleteHotel(input: { id: $id }) {
      ok
    }
  }
`;

const MAKE_RESERVATION = gql`
  mutation MakeReservation($hotelId: ID!) {
    createReservation(input: { hotelId: $hotelId }) {
      ok
    }
  }
`;

const refetchQueries = [{
  query: gql`
    {
      hotels {
        edges {
          node {
            ...HotelFragment
          }
        }
      }
    }
    ${GET_HOTEL_FRAGMENT}
  `,
}];

const ShowHotel = () => {
  const history = useHistory();
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_HOTEL, { variables: { id } });
  const [deleteHotel] = useMutation(DELETE_HOTEL, {
    refetchQueries,
    variables: { id },
    update: () => history.push('/'),
  });
  const [makeReservation] = useMutation(MAKE_RESERVATION, {
    refetchQueries,
    variables: { hotelId: id },
    update: () => history.push('/'),
  });
  const { hotel, me } = data || {};
  const { postedBy = {}, name } = hotel || {};
  const { email } = me || {};

  if (loading || error) {
    return null;
  }

  return (
    <>
      <AppBar
        {...{
          title: name,
          actions: [
            { onClick: makeReservation, buttonText: 'Reserve' },
            { onClick: () => history.push('/'), buttonText: 'Dashboard' },
            ...(postedBy.email === email ? [{
              onClick: deleteHotel, buttonText: 'Remove',
            }] :[]),
          ],
        }}
      />
    </>
  );
};

export const fragments = {
  hotel: GET_HOTEL_FRAGMENT,
};

export default ShowHotel;
