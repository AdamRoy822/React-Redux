/**
 * Created by mike on 10/18/16.
 */

import React from 'react';
import ReactSelect from '../../../components/Input/ReactSelect';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/lib/Button';
import Form from 'react-bootstrap/lib/Form';
import FormControl from 'react-bootstrap/lib/FormControl';
import Overlay from 'react-bootstrap/lib/Overlay';
import { reset, Field, reduxForm } from 'redux-form';
import classNames from 'classnames';
import moment from 'moment-timezone';
import Input from '../../../components/Input/index';
import { fetchIndications } from '../../App/actions';
import { selectIndications } from '../../App/selectors';
import { createStructuredSelector } from 'reselect';
import { selectValues, selectSyncErrors, selectFormDidChange } from '../../../common/selectors/form.selector';
import { submitAddPatientIndication, submitRemovePatientIndication, submitPatientUpdate } from '../actions';
import IndicationOverlay from './IndicationOverlay';
import formValidator from './otherValidator';
import DateOfBirthPicker from '../../../components/DateOfBirthPicker/index';

const formName = 'PatientDetailModal.Other';

@reduxForm({
  form: formName,
  validate: formValidator,
  enableReinitialize: true,
})
class OtherSection extends React.Component {
  static propTypes = {
    active: React.PropTypes.bool.isRequired,
    change: React.PropTypes.func.isRequired,
    currentUser: React.PropTypes.object,
    fetchIndications: React.PropTypes.func.isRequired,
    formSyncErrors: React.PropTypes.object,
    formValues: React.PropTypes.object,
    formDidChange: React.PropTypes.bool,
    indications: React.PropTypes.array,
    initialValues: React.PropTypes.object,
    loading: React.PropTypes.bool,
    submitting: React.PropTypes.bool,
    reset: React.PropTypes.func,
    submitAddPatientIndication: React.PropTypes.func.isRequired,
    submitRemovePatientIndication: React.PropTypes.func.isRequired,
    submitPatientUpdate: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      showIndicationPopover: false,
    };
    this.onReset = this.onReset.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.deleteIndication = this.deleteIndication.bind(this);
    this.toggleIndicationPopover = this.toggleIndicationPopover.bind(this);
    this.renderGender = this.renderGender.bind(this);
    this.renderIndications = this.renderIndications.bind(this);
  }

  componentWillMount() {
    this.props.fetchIndications();
  }

  onReset() {
    const { reset } = this.props;
    reset();
  }

  onSubmit(event) {
    event.preventDefault();
    const { formSyncErrors, initialValues, formValues, reset, submitPatientUpdate } = this.props;
    if (!formSyncErrors.gender && !formSyncErrors.bmi) {
      const data = {};
      if (formValues.gender) {
        data.gender = formValues.gender;
      }
      if (formValues.bmi) {
        data.bmi = parseFloat(formValues.bmi);
      }
      if (formValues.dobDay && formValues.dobMonth && formValues.dobYear) {
        const date = moment().year(formValues.dobYear).month(formValues.dobMonth).day(formValues.dobDay);
        data.dob = date;
      }
      submitPatientUpdate(initialValues.id, data);
      reset(formName);
    }
  }

  deleteIndication(indication) {
    const { initialValues, submitRemovePatientIndication } = this.props;
    submitRemovePatientIndication(initialValues.id, indication.id);
  }

  toggleIndicationPopover() {
    this.setState({
      showIndicationPopover: !this.state.showIndicationPopover,
    });
  }

  renderGender() {
    const { loading, submitting } = this.props;
    const genderOptions = [{
      label: 'N/A',
      value: 'N/A',
    }, {
      label: 'Male',
      value: 'Male',
    }, {
      label: 'Female',
      value: 'Female',
    }];
    return (
      <div className="field-row">
        <strong className="label">
          <label htmlFor="patient-gender">Gender</label>
        </strong>
        <div className="field patient-gender">
          <Field
            name="gender"
            component={ReactSelect}
            options={genderOptions}
            disabled={submitting || loading}
            placeholder="Select Gender"
          />
        </div>
      </div>
    );
  }

  renderIndications() {
    const { initialValues } = this.props;
    if (initialValues.indications) {
      return (
        <div className="category-list">
          {initialValues.indications.map(indication => (
            <div key={indication.id} className="category">
              <span className="link">
                <span className="text">{indication.name}</span>
                <span
                  className="icomoon-icon_trash"
                  onClick={() => {
                    this.deleteIndication(indication);
                  }}
                />
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  }

  renderUpdateButtons() {
    const { formDidChange, loading, submitting } = this.props;
    if (formDidChange) {
      return (
        <div className="pull-right">
          <Button bsStyle="primary" onClick={this.onReset}>Cancel</Button>
          <Button type="submit" disabled={submitting || loading}>Update</Button>
        </div>
      );
    }
    return null;
  }

  render() {
    const { active, currentUser, formValues: { dobDay, dobMonth, dobYear }, indications, initialValues, loading, submitting, submitAddPatientIndication } = this.props;
    if (initialValues) {
      return (
        <div className={classNames('item others', { active })}>
          <div className="item-holder">
            <div className="dates">
              <strong className="title">Dates</strong>
              <ul className="list-unstyled list-radios">
                <li>
                  <span className="title">Signed Up</span>
                  <time dateTime={initialValues.createdAt}>{moment.tz(initialValues.createdAt, currentUser.timezone).format('MM/DD/YY [at] h:mm A')}</time>
                </li>
                <li>
                  <span className="title">Updated</span>
                  <time dateTime={initialValues.updatedAt}>{moment.tz(initialValues.updatedAt, currentUser.timezone).format('MM/DD/YY [at] h:mm A')}</time>
                </li>
              </ul>
            </div>
            <Form className="sub-holder form-lightbox" onSubmit={this.onSubmit}>
              <strong className="title">TAGS</strong>
              <div className="field-row">
                <strong className="label">Indications</strong>
                <div
                  className="field add-indications"
                  ref={(parent) => (
                    this.parent = parent
                  )}
                >
                  <Button
                    bsStyle="primary"
                    ref={(target) => (
                      this.target = target
                    )}
                    onClick={this.toggleIndicationPopover}
                  >
                    + Add Indication
                  </Button>
                  <Overlay
                    show={this.state.showIndicationPopover}
                    placement="bottom"
                    container={this.parent}
                    target={() => this.target}
                  >
                    <IndicationOverlay indications={indications} submitAddIndication={submitAddPatientIndication} patient={initialValues} onClose={this.toggleIndicationPopover} />
                  </Overlay>
                </div>
              </div>
              <div className="field-row remove-indication">
                <span className="label" />
                <div className="field">
                  {this.renderIndications()}
                </div>
              </div>
              <div className="fields-holder">
                <strong className="title">Other Information</strong>
                <DateOfBirthPicker
                  loading={loading}
                  submitting={submitting}
                  dobDay={dobDay}
                  dobMonth={dobMonth}
                  dobYear={dobYear}
                />
                {this.renderGender()}
                <div className="field-row">
                  <strong className="label">
                    <label htmlFor="patient-bmi">BMI</label>
                  </strong>
                  <div className="field">
                    <Field
                      type="text"
                      name="bmi"
                      component={Input}
                    />
                  </div>
                </div>
                <div className="field-row">
                  <strong className="label">
                    <label htmlFor="patient-source5">Source</label>
                  </strong>
                  <div className="field">
                    <FormControl type="text" value={initialValues.source ? initialValues.source.type : ''} disabled readOnly />
                  </div>
                </div>
              </div>
              {this.renderUpdateButtons()}
            </Form>
          </div>
        </div>
      );
    }
    return null;
  }
}

const mapStateToProps = createStructuredSelector({
  formSyncErrors: selectSyncErrors(formName),
  formValues: selectValues(formName),
  formDidChange: selectFormDidChange(formName),
  indications: selectIndications(),
});

const mapDispatchToProps = (dispatch) => ({
  fetchIndications: () => dispatch(fetchIndications()),
  reset: () => dispatch(reset(formName)),
  submitAddPatientIndication: (patientId, indication) => dispatch(submitAddPatientIndication(patientId, indication)),
  submitRemovePatientIndication: (patientId, indicationId) => dispatch(submitRemovePatientIndication(patientId, indicationId)),
  submitPatientUpdate: (patientId, fields) => dispatch(submitPatientUpdate(patientId, fields)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OtherSection);
