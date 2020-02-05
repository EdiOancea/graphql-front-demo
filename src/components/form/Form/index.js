import React from 'react';
import styled from 'styled-components';
import { Form as RFForm } from 'react-final-form';
import Error from '../Error';

const StyledForm = styled.form`
  width: 100%;
`;

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
      validate: values => {
        try {
          validationSchema.validateSync(
            values,
            { abortEarly: false, context: { values } },
          );
        } catch (err) {
          return err.inner.reduce((errors, { path, message }) => ({
            ...errors,
            [path]: errors[path] ? `${errors[path]}. ${message}` : message,
          }), {});
        }

        return true;
      },
      render: ({ handleSubmit, form }) => (
        <StyledForm noValidate={true} onSubmit={handleSubmit}>
          {fields.map(({ component: Component, fieldProps }) => (
            <Component
              {...{
                ...fieldProps,
                key: fieldProps.id,
              }}
            />
          ))}
          {errors && errors.map(error => (
            <Error
              {...{
                error: error.message,
                touched: true,
              }}
            />
          ))}
          {submitButton.render()}
        </StyledForm>
      ),
    }}
  />
);

export default Form;
