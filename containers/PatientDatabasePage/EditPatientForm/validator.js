import { validatorFactory } from 'utils/reduxForm';

const schema = {
  firstName: { presence: true },
  lastName: { presence: true },
  email: { email:true, presence: true },
  phone: { presence: true },
  indication: { presence: false },
  age: { presence: false },
  gender: { presence: false },
  bmi: { presence: false },
  status: { presence: false },
  source: { presence: false },
};

export default validatorFactory(schema);
