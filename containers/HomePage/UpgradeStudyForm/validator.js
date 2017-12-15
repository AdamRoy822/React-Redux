import { validatorFactory } from 'utils/reduxForm';

const schema = {
  level: { presence: true },
  patientMessagingSuite: { presence: false },
  callTracking: { presence: false },
  notes: { presence: false },
};

export default validatorFactory(schema);
