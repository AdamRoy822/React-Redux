import { validatorFactory } from 'utils/reduxForm';

const schema = {
  patients: { presence: { message: '^Patients are required.' } },
};

export default validatorFactory(schema);
