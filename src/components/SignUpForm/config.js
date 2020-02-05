import * as Yup from 'yup';

import TextField from 'components/form/TextField';

export const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('This field must be a valid email')
    .required('This field is required'),
  firstName: Yup.string().required('This field is required'),
  lastName: Yup.string().required('This field is required'),
  password: Yup.string().required('This field is required'),
  confirmPassword: Yup.string()
    .required('This field is required')
    .test({
      name: 'equal passwords',
      message: 'This field must be equal to the password field.',
      test: function(values) {
        const { password } = this.options.context.values;

        return values === password;
      }
    }),
});

export const fields = [
  {
    fieldProps: {
      id: 'email',
      label: 'Email',
      name: 'email',
      autoComplete: 'off',
    },
  },
  {
    fieldProps: {
      id: 'firstName',
      label: 'First Name',
      name: 'firstName',
      autoComplete: 'off',
    },
  },
  {
    fieldProps: {
      id: 'lastName',
      label: 'Last Name',
      name: 'lastName',
      autoComplete: 'off',
    },
  },
  {
    fieldProps: {
      id: 'password',
      label: 'Password',
      name: 'password',
      type: 'password',
      autoComplete: 'off',
    },
  },
  {
    fieldProps: {
      id: 'confirmPassword',
      label: 'Confirm Password',
      name: 'confirmPassword',
      type: 'password',
      autoComplete: 'off',
    },
  },
].map(field => ({ ...field, component: TextField }))
