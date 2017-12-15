import { validatorFactory } from 'utils/reduxForm';

const schema = {
  firstName: { presence: true },
  lastName: { presence: true },
  email: { presence: true },
  site: { presence: true },
  purchase: { presence: false },
  reward: { presence: false },
};

export default validatorFactory(schema);
