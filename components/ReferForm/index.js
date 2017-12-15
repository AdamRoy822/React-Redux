/**
*
* ReferForm
*
*/

import React from 'react';

import { Field, reduxForm } from 'redux-form'; // eslint-disable-line

import Input from 'components/Input';
import ReactSelect from 'components/Input/ReactSelect';
import referFormValidator from './validator';

@reduxForm({ form: 'refer', validate: referFormValidator })
class ReferForm extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    error: React.PropTypes.object,
    handleSubmit: React.PropTypes.func.isRequired,
    reset: React.PropTypes.func.isRequired,
    pristine: React.PropTypes.bool.isRequired,
    submitting: React.PropTypes.bool.isRequired,
    companyTypes: React.PropTypes.array,
  };

  render() {
    const { error, handleSubmit, pristine, reset, submitting } = this.props; // eslint-disable-line
    const { companyTypes } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-fields">

          <div className="field-row">
            <strong className="label required"><label>CONTACT NAME</label></strong>
            <div className="field">
              <div className="row">
                <Field
                  name="firstName"
                  component={Input}
                  type="text"
                  placeholder="First Name"
                  className="col pull-left"
                />
                <Field
                  name="lastName"
                  component={Input}
                  type="text"
                  placeholder="Last Name"
                  className="col pull-right"
                />
              </div>
            </div>
          </div>

          <div className="field-row">
            <strong className="label required"><label>CONTACT EMAIL</label></strong>
            <Field
              name="email"
              component={Input}
              type="email"
              className="field"
            />
          </div>

          <div className="field-row">
            <strong className="label required"><label>CONTACT COMPANY NAME</label></strong>
            <Field
              name="companyName"
              component={Input}
              type="text"
              className="field"
            />
          </div>

          <div className="field-row">
            <strong className="label required"><label>CONTACT COMPANY TYPE</label></strong>
            <Field
              name="companyType"
              component={ReactSelect}
              placeholder="Select Company Type"
              options={companyTypes}
              className="field"
            />
          </div>

          <div className="field-row textarea">
            <strong className="label"><label>Message</label></strong>
            <Field
              name="message"
              component={Input}
              componentClass="textarea"
              className="field"
            />
          </div>

          <div className="btn-block text-right">
            <input
              type="submit"
              value="SUBMIT"
              className="btn btn-default"
              disabled={pristine || submitting}
            />
          </div>
        </div>
      </form>
    );
  }
}

export default ReferForm;
