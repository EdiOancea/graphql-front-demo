import React from 'react';
import { TextField as MuiTextField } from '@material-ui/core';
import { Field } from 'react-final-form';

import Error from 'components/form/Error';

const TextField = ({
  variant = 'outlined',
  margin = 'normal',
  fullWidth = true,
  id,
  label,
  name,
  autoComplete,
  autoFocus = false,
  type,
}) => (
  <Field
    {...{
      name,
      render: ({ input, meta }) => (
        <>
          <MuiTextField
            {...{
              variant,
              margin,
              fullWidth,
              id,
              label,
              autoComplete,
              autoFocus,
              type,
              ...input,
            }}
          />
          <Error {...meta} />
        </>
      ),
    }}
  />

);

export default TextField;
