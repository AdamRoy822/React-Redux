import { validatorFactory } from 'utils/reduxForm';

const schema = {
  couponId: { presence: false },
  creditCard: { presence: { message: '^You need to select credit card' } },
};

export default validatorFactory(schema);
