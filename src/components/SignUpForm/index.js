import React from 'react';
import { useHistory } from 'react-router-dom';
import { Link, Container } from '@material-ui/core';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

import Form from 'components/form/Form';
import Button from 'components/Button';
import { Wrapper, Title } from './styles';
import { validationSchema, fields } from './config.js';

const CREATE_USER = gql`
  mutation CreateUser(
    $firstName: String!,
    $lastName: String!,
    $email: String!,
    $password: String!
  ) {
    createUser(input: {
      email: $email,
      firstName: $firstName,
      lastName: $lastName,
      password: $password
    }) {
      user {
        id,
        email,
        firstName,
        lastName
      }
    }
  }
`;

const SignUp = () => {
  const history = useHistory();
  const [signup] = useMutation(
    CREATE_USER, {
      update: (cache, { data: { createUser } }) => {
        if (createUser) {
          history.push('/signin');
        }
      },
    }
  );

  return (
    <Container component="main" maxWidth="xs">
      <Wrapper>
        <Title>Sign up</Title>
        <Form
          {...{
            onSubmit: values => signup({ variables: values }),
            validationSchema,
            fields,
            submitButton: {
              render: () => (
                <Button
                  {...{
                    type: 'submit',
                    color: 'primary',
                  }}
                >
                  Sign up
                </Button>
              ),
            },
          }}
        />
        <Link href="/signin" variant="body2">
          Already have an account? Sign in!
        </Link>
      </Wrapper>
    </Container>
  );
};

export default SignUp;
