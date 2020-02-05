import * as Yup from 'yup';

import TextField from 'components/form/TextField';

export const validationSchema = Yup.object().shape({
  name: Yup.string().required('This field is required'),
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
].map(field => ({ ...field, component: TextField }))
