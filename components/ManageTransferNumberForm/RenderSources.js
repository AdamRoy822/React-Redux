import React, { PropTypes } from 'react';

import { Field } from 'redux-form';

import Input from 'components/Input';

const RenderSources = ({ fields, formValues }) => (
  <tbody>
    {fields.map((source, index) =>
      <tr className="card-container" key={index}>
        <td className="card-type">
          {formValues.sourcesList[index].type}
        </td>
        <td className="name-on-card">
          {formValues.sourcesList[index].twilioCallNumber ? formValues.sourcesList[index].twilioCallNumber.phoneNumber : '-'}
        </td>
        <td className="last-4-digits">
          {formValues.sourcesList[index].twilioTextNumber ? formValues.sourcesList[index].twilioTextNumber.phoneNumber : '-'}
        </td>
        <td className="expiration-date">
          <Field
            name={`${source}.twilioRedirectNumber.phoneNumber`}
            component={Input}
            type="text"
            className="field"
          />
        </td>
      </tr>
    )}
  </tbody>
);

RenderSources.propTypes = {
  fields: PropTypes.object,
  formValues: PropTypes.object.isRequired,
};

export default RenderSources;
