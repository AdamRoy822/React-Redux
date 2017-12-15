import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Field, reduxForm, change } from 'redux-form';
import _, { map } from 'lodash';
import moment from 'moment-timezone';
import Button from 'react-bootstrap/lib/Button';
import Form from 'react-bootstrap/lib/Form';

import Input from 'components/Input';
import ReactSelect from 'components/Input/ReactSelect';
import { selectEditPatientFormError } from './selectors';
import { selectPatientCategories, selectSavedPatient } from 'containers/PatientDatabasePage/selectors';
import { selectIndications, selectSources } from 'containers/App/selectors';
import formValidator from './validator';
import LoadingSpinner from 'components/LoadingSpinner';
import Checkbox from '../../../components/Input/Checkbox';
import DateOfBirthPicker from '../../../components/DateOfBirthPicker/index';
import { selectValues } from '../../../common/selectors/form.selector';
import Overlay from 'react-bootstrap/lib/Overlay';
import IndicationOverlay from 'containers/StudyPage/PatientDetail/IndicationOverlay';

const formName = 'editPatient';

const mapStateToProps = createStructuredSelector({
  formValues: selectValues(formName),
  indications: selectIndications(),
  sources: selectSources(),
  patientCategories: selectPatientCategories(),
  savedPatient: selectSavedPatient(),
  hasError: selectEditPatientFormError(),
});

@reduxForm({ form: formName, validate: formValidator })
@connect(mapStateToProps, null)
class EditPatientForm extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    indications: PropTypes.array,
    initialValues: PropTypes.object,
    loading: React.PropTypes.bool,
    submitting: React.PropTypes.bool,
    formValues: React.PropTypes.object,
    sources: PropTypes.array,
    patientCategories: PropTypes.object,
    savedPatient: PropTypes.object,
    hasError: PropTypes.bool,
    onSubmit: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      showIndicationPopover: false,
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.renderIndications = this.renderIndications.bind(this);
    this.toggleIndicationPopover = this.toggleIndicationPopover.bind(this);
    this.deleteIndication = this.deleteIndication.bind(this);
    this.selectIndication = this.selectIndication.bind(this);
    this.submitAddIndication = this.submitAddIndication.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();
    const { onSubmit, formValues } = this.props;
    const formattedData = formValues;
    if (formValues.dobDay && formValues.dobMonth && formValues.dobYear) {
      const date = moment().year(formValues.dobYear).month(formValues.dobMonth).day(formValues.dobDay);
      formattedData.dob = date;
    }
    onSubmit(formattedData);
  }

  deleteIndication(indication) {
    const newArr = _.remove(this.props.formValues.indications, (n) => (n.id !== indication.id));
    this.props.dispatch(change('editPatient', 'indications', newArr));
  }

  toggleIndicationPopover() {
    this.setState({
      showIndicationPopover: !this.state.showIndicationPopover,
    });
  }

  selectIndication(indication) {
    this.props.dispatch(change('editPatient', 'indications', this.props.formValues.indications.concat([indication])));
  }

  submitAddIndication() {

  }

  renderIndications() {
    const { formValues } = this.props;
    if (formValues.indications) {
      return (
        <div className="category-list">
          {formValues.indications.map((indication) => (
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

  render() {
    const { formValues, formValues: { dobDay, dobMonth, dobYear }, indications, initialValues, sources, patientCategories, hasError, loading, submitting, savedPatient } = this.props;
    const indicationOptions = map(indications, indicationIterator => ({
      label: indicationIterator.name,
      value: indicationIterator.id,
    }));
    const sourceOptions = map(sources, sourceIterator => ({
      label: sourceIterator.type,
      value: sourceIterator.id,
    }));
    const statusOptions = map(patientCategories.details, patientCategoryIterator => ({
      label: patientCategoryIterator.name,
      value: patientCategoryIterator.id,
    }));
    const genderOptions = [
      {
        label: 'Male',
        value: 'Male',
      }, {
        label: 'Female',
        value: 'Female',
      },
    ];
    const patientValues = {
      id: initialValues.id,
      indications: formValues.indications,
    };
    return (
      <Form className="form-lightbox form-edit-patient-information" onSubmit={this.onSubmit}>
        <div className="field-row form-group">
          <strong className="label required">
            <label>NAME</label>
          </strong>
          <div className="field">
            <div className="row">
              <div className="col pull-left">
                <Field
                  name="firstName"
                  component={Input}
                  type="text"
                  placeholder="First Name"
                  disabled={savedPatient.saving}
                />
              </div>
              <div className="col pull-right">
                <Field
                  name="lastName"
                  component={Input}
                  type="text"
                  placeholder="Last Name"
                  disabled={savedPatient.saving}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="field-row form-group">
          <strong className="label required">
            <label>Email</label>
          </strong>
          <Field
            name="email"
            component={Input}
            type="text"
            className="field"
            disabled={savedPatient.saving}
          />
        </div>
        <div className="field-row form-group">
          <strong className="label required">
            <label>Phone</label>
          </strong>
          <Field
            name="phone"
            component={Input}
            type="text"
            className="field"
            disabled={savedPatient.saving}
          />
        </div>
        <div className="field-row form-group patient-database-indication-hidden">
          <strong className="label">
            <label>Indications</label>
          </strong>
          <Field
            name="indications"
            component={ReactSelect}
            placeholder="Select Indication"
            options={indicationOptions}
            multi
            joinValues
            objectValue
            clearable={false}
            disabled={savedPatient.saving}
            className="multiSelectWrap field"
          />
        </div>
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
              <IndicationOverlay indications={indications} submitAddIndication={this.submitAddIndication} selectIndication={this.selectIndication} patient={patientValues} onClose={this.toggleIndicationPopover} />
            </Overlay>
          </div>
        </div>
        <div className="field-row remove-indication">
          <span className="label" />
          <div className="field">
            {this.renderIndications()}
          </div>
        </div>
        <DateOfBirthPicker
          loading={loading}
          submitting={submitting}
          initialValues={initialValues}
          dobDay={dobDay}
          dobMonth={dobMonth}
          dobYear={dobYear}
        />
        <div className="field-row form-group">
          <strong className="label">
            <label>GENDER</label>
          </strong>
          <Field
            name="gender"
            component={ReactSelect}
            className="field"
            placeholder="Select Gender"
            options={genderOptions}
            disabled={savedPatient.saving}
          />
        </div>
        <div className="field-row form-group">
          <strong className="label">
            <label>BMI</label>
          </strong>
          <Field
            name="bmi"
            component={Input}
            className="field"
            type="text"
            disabled={savedPatient.saving}
          />
        </div>
        {(() => {
          if (this.props.formValues.status) {
            return (
              <div className="field-row form-group">
                <strong className="label">
                  <label>STATUS</label>
                </strong>
                <div className="field">
                  <Field
                    name="status"
                    component={ReactSelect}
                    placeholder="Select Status"
                    options={statusOptions}
                    disabled={savedPatient.saving}
                  />
                </div>
              </div>
            );
          }

          return false;
        })()}
        <div className="field-row form-group">
          <strong className="label">
            <label>SOURCE</label>
          </strong>
          <Field
            name="source"
            component={ReactSelect}
            className="field"
            placeholder="Select Source"
            options={sourceOptions}
            disabled={savedPatient.saving}
          />
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
        <div className="btn-block text-right">
          <Button type="submit" className="btn-add-row" disabled={hasError || savedPatient.saving}>
            {savedPatient.saving
              ? <span><LoadingSpinner showOnlyIcon size={20} className="saving-patient" /></span>
              : <span>Submit</span>
            }
          </Button>
        </div>
      </Form>
    );
  }
}

export default EditPatientForm;
