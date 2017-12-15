import { validatorFactory } from 'utils/reduxForm';

const schema = {
  password: { presence: true },
};

export default validatorFactory(schema);
