/**
 * Created by mike on 10/16/16.
 */

import React from 'react';
import { connect } from 'react-redux';
import { reset, blur, Field, reduxForm } from 'redux-form';

import Button from 'react-bootstrap/lib/Button';
import Form from 'react-bootstrap/lib/Form';
import Checkbox from '../../../components/Input/Checkbox';
import Input from '../../../components/Input/index';
import { submitPatientUpdate } from '../actions';
import formValidator from './detailValidator';
import { normalizePhone, normalizePhoneDisplay } from '../helper/functions';
import { selectSyncErrors, selectValues, selectFormDidChange } from '../../../common/selectors/form.selector';
import { createStructuredSelector } from 'reselect';

const formName = 'PatientDetailModal.Detail';

@reduxForm({
  form: formName,
  validate: formValidator,
  enableReinitialize: true,
})
class PatientDetailSection extends React.Component {
  static propTypes = {
    blur: React.PropTypes.func,
    initialValues: React.PropTypes.object,
    reset: React.PropTypes.func,
    submitting: React.PropTypes.bool.isRequired,
    submitPatientUpdate: React.PropTypes.func.isRequired,
    formSyncErrors: React.PropTypes.object,
    formValues: React.PropTypes.object,
    formDidChange: React.PropTypes.bool,
  };

  constructor(props) {
    super(props);
    this.onReset = this.onReset.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onReset() {
    const { reset } = this.props;
    reset();
  }

  onSubmit(event) {
    event.preventDefault();
    const { blur, formSyncErrors, formValues, initialValues, reset, submitPatientUpdate } = this.props;
    if (!formSyncErrors.firstName && !formSyncErrors.lastName && !formSyncErrors.email && !formSyncErrors.phone) {
      const formattedPhoneNumber = normalizePhoneDisplay(formValues.phone);
      blur('phone', formattedPhoneNumber);
      const phoneNumber = normalizePhone(formValues.phone);
      submitPatientUpdate(initialValues.id, {
        firstName: formValues.firstName,
        lastName: formValues.lastName,
        email: formValues.email,
        phone: phoneNumber,
        unsubscribed: formValues.unsubscribed,
      });
    }
    reset(formName);
  }

  renderUpdateButtons() {
    const { formDidChange } = this.props;
    if (formDidChange) {
      return (
        <div className="pull-right">
          <Button bsStyle="primary" onClick={this.onReset}>Cancel</Button>
          <Button type="submit">Update</Button>
        </div>
      );
    }
    return null;
  }

  render() {
    const { submitting } = this.props;
    return (
      <Form className="form-lightbox form-patients-list" onSubmit={this.onSubmit}>
        <div className="field-row">
          <strong className="label required">
            <label htmlFor="new-patient-first-name">Name</label>
          </strong>
          <div className="field">
            <div className="row">
              <div className="col pull-left">
                <Field
                  type="text"
                  name="firstName"
                  component={Input}
                  placeholder="First Name"
                  isDisabled={submitting}
                  required
                  tooltipDisabled
                />
              </div>
              <div className="col pull-right">
                <Field
                  type="text"
                  name="lastName"
                  component={Input}
                  placeholder="Last Name"
                  isDisabled={submitting}
                  required
                  tooltipDisabled
                />
              </div>
            </div>
          </div>
        </div>
        <div className="field-row">
          <strong className="label">
            <label htmlFor="new-patient-email">Email</label>
          </strong>
          <div className="field">
            <Field
              type="email"
              name="email"
              component={Input}
              tooltipDisabled
            />
          </div>
        </div>
        <div className="field-row">
          <strong className="label required">
            <label htmlFor="new-patient-phone">Phone</label>
          </strong>
          <div className="field">
            <Field
              type="tel"
              name="phone"
              component={Input}
              required
              tooltipDisabled
            />
          </div>
        </div>
        <div className="field-row">
          <strong className="label" />
          <div className="field">
            <Field
              name="unsubscribed"
              type="checkbox"
              component={Checkbox}
              className="pull-left"
            />
            <label htmlFor="unsubscribed">Unsubscribe</label>
          </div>
        </div>
        {this.renderUpdateButtons()}
        <div className="clearfix" />
      </Form>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  formSyncErrors: selectSyncErrors(formName),
  formValues: selectValues(formName),
  formDidChange: selectFormDidChange(formName),
});

const mapDispatchToProps = (dispatch) => ({
  reset: () => dispatch(reset(formName)),
  submitPatientUpdate: (patientId, fields) => dispatch(submitPatientUpdate(patientId, fields)),
  blur: (field, value) => dispatch(blur(formName, field, value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PatientDetailSection);
