import { validatorFactory } from 'utils/reduxForm';

const schema = {
  name: { presence: false },
  includeIndication: { presence: false },
  excludeIndication: { presence: false },
  gender: { presence: false },
  status: { presence: false },
  source: { presence: false },
  ageFrom: { presence: false },
  ageTo: { presence: false },
  bmiFrom: { presence: false },
  bmiTo: { presence: false },
};

export default validatorFactory(schema);
