import { validatorFactory } from 'utils/reduxForm';

const schema = {
  body: { presence: true },
};

export default validatorFactory(schema);
