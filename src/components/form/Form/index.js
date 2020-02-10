import React from 'react';
import styled from 'styled-components';
import { Form as RFForm } from 'react-final-form';
import Error from '../Error';

import { getValidate } from './helpers';

const StyledForm = styled.form`
  width: 100%;
`;

const renderFields = fields => fields.map(({
  component: Component,
  fieldProps,
}) => (
  <Component
    {...{
      ...fieldProps,
      key: fieldProps.id,
    }}
  />
));

const renderAPIErrors = errors => errors && errors.map(error => (
  <Error
    {...{
      error: error.message,
      touched: true,
    }}
  />
));

const Form = ({
  onSubmit,
  validationSchema,
  fields,
  submitButton,
  errors,
}) => (
  <RFForm
    {...{
      onSubmit,
      validate: getValidate(validationSchema),
      render: ({ handleSubmit }) => (
        <StyledForm noValidate={true} onSubmit={handleSubmit}>
          {renderFields(fields)}
          {renderAPIErrors(errors)}
          {submitButton.render()}
        </StyledForm>
      ),
    }}
  />
);

export default Form;
