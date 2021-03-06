import React from 'react';
import { useHistory } from 'react-router-dom';
import { Container } from '@material-ui/core';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

import { fragments as showHotelsFragments } from 'components/ShowHotels';
import { fragments as showHotelFragments } from 'components/ShowHotel';
import Form from 'components/form/Form';
import Button from 'components/Button';
import AppBar from 'components/AppBar';
import { Wrapper, Title } from './styles';
import { validationSchema, fields } from './config';

const CREATE_HOTEL = gql`
  mutation CreateHotel(
    $name: String!
    $location: String!
    $description: String!
    $roomCount: Int!
  ) {
    createHotel(input: {
      name: $name
      location: $location
      description: $description
      roomCount: $roomCount
    }) {
      hotel {
        ...HotelFragment
      }
    }
  }
  ${showHotelFragments.hotel}
`;

const AddHotelForm = () => {
  const history = useHistory();
  const [signin, { error }] = useMutation(CREATE_HOTEL, {
    update: () => history.push('/'),
    refetchQueries: [{
      query: gql`
        {
          ...HotelsFragment
        }
        ${showHotelsFragments.hotels}
      `,
    }],
  });

  return (
    <>
      <AppBar
        {...{
          title: 'Add Hotel',
          actions: [
            { onClick: () => history.push('/'), buttonText: 'Dashboard' },
          ],
        }}
      />
      <Container component="main" maxWidth="xs">
        <Wrapper>
          <Title>Add Hotel</Title>
          <Form
            {...{
              onSubmit: values => signin({ variables: values }),
              validationSchema,
              fields,
              submitButton: {
                render: () => <Button type="submit">Add</Button>,
              },
              errors: error && error.graphQLErrors,
            }}
          />
        </Wrapper>
      </Container>
    </>
  );
};

export default AddHotelForm;
