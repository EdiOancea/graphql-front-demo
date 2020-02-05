import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';

const GET_HOTEL_FRAGMENT = gql`
  fragment HotelFragment on HotelType {
    id
    name
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
  const { id } = useParams();
  const history = useHistory();
  const { loading, error, data } = useQuery(GET_HOTEL, { variables: { id } });
  const [deleteHotel] = useMutation(DELETE_HOTEL, {
    refetchQueries,
    variables: { id },
    update: () => history.push('/'),
  });

  return !loading && !error && (
    <div>
      {data.hotel.name}
      <button onClick={deleteHotel}>Delete</button>
    </div>
  )
};

export const fragments = {
  hotel: GET_HOTEL_FRAGMENT,
};

export default ShowHotel;
