import * as Yup from 'yup';

import TextField from 'components/form/TextField';

export const validationSchema = Yup.object().shape({
  name: Yup.string().required('This field is required'),
  location: Yup.string().required('This field is required'),
  description: Yup.string().required('This field is required'),
  roomCount: Yup
    .number()
    .integer()
    .required('This field is required')
    .positive('This field must be positive'),
});

export const fields = [
  {
    fieldProps: {
      id: 'name',
      label: 'Name',
      name: 'name',
      autoComplete: 'off',
    },
  },
  {
    fieldProps: {
      id: 'location',
      label: 'Location',
      name: 'location',
      autoComplete: 'off',
    },
  },
  {
    fieldProps: {
      id: 'description',
      label: 'Description',
      name: 'description',
      autoComplete: 'off',
    },
  },
  {
    fieldProps: {
      id: 'roomCount',
      label: 'Number of rooms',
      name: 'roomCount',
      autoComplete: 'off',
    },
  },
].map(field => ({ ...field, component: TextField }))
