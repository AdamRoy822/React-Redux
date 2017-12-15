import { validatorFactory } from 'utils/reduxForm';

const schema = {
  site: { presence: true },
  rewardType: { presence: { message: '^You need to select reward type' } },
};

export default validatorFactory(schema);
