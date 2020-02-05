import React from 'react';
import { useHistory } from 'react-router-dom';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Link, Container } from '@material-ui/core';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

import Form from 'components/form/Form';
import Button from 'components/Button';
import { Wrapper, StyledAvatar, Title } from './styles';
import { validationSchema, fields } from './config';

const TOKEN_AUTH = gql`
  mutation TokenAuth($email: String!, $password: String!) {
    tokenAuth(email: $email, password: $password) {
      token
    }
  }
`;

const SignIn = () => {
  const history = useHistory();
  const [signin, { error }] = useMutation(TOKEN_AUTH, {
    update: (_, { data: { tokenAuth } }) => {
      if (tokenAuth) {
        localStorage.setItem('token', tokenAuth.token);
        history.push('/');
      }
    },
    onError: () => null,
  });

  return (
    <Container component="main" maxWidth="xs">
      <Wrapper>
        <StyledAvatar>
          <LockOutlinedIcon />
        </StyledAvatar>
        <Title>Sign in</Title>
        <Form
          {...{
            onSubmit: values => signin({ variables: values }),
            validationSchema,
            fields,
            submitButton: { render: () => <Button type="submit">Sign in</Button> },
            errors: error && error.graphQLErrors,
          }}
        />
        <Link href="/signup" variant="body2">
          Don't have an account? Sign Up
        </Link>
      </Wrapper>
    </Container>
  );
};

export default SignIn;
