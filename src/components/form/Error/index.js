import React from 'react';
import styled from 'styled-components';

const Gucci = styled.div`
  color: red;
  margin: 0 3px;
`;

const Error = ({ touched, error }) => (
  touched && error && <Gucci>{error}</Gucci>
) || null;

export default Error;
