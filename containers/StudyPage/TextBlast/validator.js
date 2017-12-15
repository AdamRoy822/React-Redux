import { validatorFactory } from 'utils/reduxForm';

const schema = {
  message: { presence: { message: '^Message is required.' } },
  patients: { presence: { message: '^Patients are required.' } },
};

export default validatorFactory(schema);
