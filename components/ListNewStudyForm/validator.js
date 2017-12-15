import { validatorFactory } from 'utils/reduxForm';

const schema = {
  siteLocation: { presence: { message: '^You need to select site location' } },
  indication_id: { presence: { message: '^You need to select indication' } },
  protocolNumber: { presence: true },
  sponsorName: { presence: true },
  sponsorEmail: { email: true },
  recruitmentPhone: { presence: true },
  croContactEmail: { email: true },
  irbEmail: { email: true },
  exposureLevel: { presence: { message: '^You need to select exposure level' } },
  campaignLength: { presence: { message: '^You need to select campaign length' } },
  startDate: { presence: true },
};

export default validatorFactory(schema);
