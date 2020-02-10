import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  color: red;
  margin: 0 3px;
`;

const Error = ({ touched, error }) => (
  touched && error && <Wrapper>{error}</Wrapper>
) || null;

export default Error;
