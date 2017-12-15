import { validatorFactory } from 'utils/reduxForm';

const schema = {
  email: { presence: true, email: true },
  firstName: { presence: true },
  lastName: { presence: true },
  companyName: { presence: true },
  companyType: { presence: { message: '^You need to select company type' } },
};

export default validatorFactory(schema);
