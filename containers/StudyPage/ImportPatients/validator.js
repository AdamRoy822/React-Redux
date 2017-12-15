import { validatorFactory } from 'utils/reduxForm';

const schema = {
  firstName: { presence: { message: '^First name cannot be blank' } },
  lastName: { presence: { message: '^Last name cannot be blank' } },
  email: { email: { message: '^Email not valid' } },
  phone: {
    presence: {
      message: '^Phone number cannot be blank',
    },
    numericality: {
      message: '^Phone number must be all numbers',
    },
    length: {
      minimum:10,
      message: '^Phone number too short',
    },
  },

};

export default validatorFactory(schema);
