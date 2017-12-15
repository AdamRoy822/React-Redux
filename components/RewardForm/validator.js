import { validatorFactory } from 'utils/reduxForm';

const schema = {
  site: { presence: { message: '^You need to select site location' } },
};

export default validatorFactory(schema);
