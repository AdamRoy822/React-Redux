const validate = values => {
  const errors = {};
  errors.sourcesList = [];
  if (values.sourcesList) {
    values.sourcesList.forEach((source, index) => {
      if (source.twilioRedirectNumber && source.twilioRedirectNumber.phoneNumber) {
        const regex = /^\+(?:[0-9] ?){6,14}[0-9]$/;

        if (!regex.test(source.twilioRedirectNumber.phoneNumber)) {
          errors.sourcesList[index] = {};
          errors.sourcesList[index].twilioRedirectNumber = {};
          errors.sourcesList[index].twilioRedirectNumber.phoneNumber = {};
          errors.sourcesList[index].twilioRedirectNumber.phoneNumber._error = 'No more than five hobbies allowed'; // eslint-disable-line no-underscore-dangle
          // Valid international phone number
        }
      }
    });
  }

  return errors;
};

export default validate;
