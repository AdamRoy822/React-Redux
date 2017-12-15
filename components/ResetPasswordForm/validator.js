import { validatorFactory } from 'utils/reduxForm';

const schema = {
  email: { presence: true, email: true },
};

export default validatorFactory(schema);
