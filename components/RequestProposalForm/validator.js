import { validatorFactory } from 'utils/reduxForm';

const schema = {
  site: { presence: { message: '^You need to select site location' } },
  indication_id: { presence: { message: '^You need to select indication' } },
  protocol: { presence: true },
  sponsorEmail: { email: true },
  croEmail: { email: true },
  irbEmail: { email: true },
  level_id: { presence: { message: '^You need to select exposure level' } },
  campaignLength: { presence: { message: '^You need to select campaign length' } },
  startDate: { presence: true },
};

export default validatorFactory(schema);
