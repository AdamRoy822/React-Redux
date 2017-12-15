/**
*
* AddEmailNotificationForm
*
*/

import React from 'react';
import formValidator from './validator';
import { Field, reduxForm } from 'redux-form';
import Input from 'components/Input';

@reduxForm({ form: 'addEmailNotificationForm', validate: formValidator })
class AddEmailNotificationForm extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    error: React.PropTypes.object,
    handleSubmit: React.PropTypes.func.isRequired,
    reset: React.PropTypes.func.isRequired,
    pristine: React.PropTypes.bool.isRequired,
    submitting: React.PropTypes.bool.isRequired,
  };

  render() {
    const { error, handleSubmit, pristine, reset, submitting } = this.props; // eslint-disable-line

    return (
      <form onSubmit={handleSubmit} className="form-lightbox">

        <div className="field-row">
          <strong className="label required"><label>Name</label></strong>
          <div className="field">
            <div className="row">
              <div className="col pull-left">
                <Field
                  name="firstName"
                  component={Input}
                  type="text"
                />
              </div>
              <div className="col pull-right">
                <Field
                  name="lastName"
                  component={Input}
                  type="text"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="field-row">
          <strong className="label required"><label>Email</label></strong>
          <Field
            name="email"
            component={Input}
            type="email"
            className="field"
          />
        </div>

        <div className="btn-block text-right">
          <input
            type="submit"
            value="SUBMIT"
            className="btn btn-default"
            disabled={submitting}
          />
        </div>
      </form>
    );
  }
}

export default AddEmailNotificationForm;
