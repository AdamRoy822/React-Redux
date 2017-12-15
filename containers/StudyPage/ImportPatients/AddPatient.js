/**
 * Created by mike on 10/9/16.
 */

import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';
import Form from 'react-bootstrap/lib/Form';
import formValidator from './validator';
import Input from '../../../components/Input/index';
import CenteredModal from '../../../components/CenteredModal/index';
import { submitAddPatient } from '../actions';
import { selectStudyId } from '../selectors';
import { selectSyncErrors, selectValues } from '../../../common/selectors/form.selector';
import { createStructuredSelector } from 'reselect';
import { normalizePhone } from '../helper/functions';

const formName = 'addPatient';

@reduxForm({ form: formName, validate: formValidator })
class AddPatient extends React.Component {
  static propTypes = {
    errorList: React.PropTypes.object.isRequired,
    newPatient: React.PropTypes.object,
    show: React.PropTypes.bool.isRequired,
    studyId: React.PropTypes.number.isRequired,
    submitAddPatient: React.PropTypes.func.isRequired,
    onClose: React.PropTypes.func.isRequired,
    onHide: React.PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);
    this.addPatient = this.addPatient.bind(this);
  }

  addPatient(event) {
    event.preventDefault();
    const { submitAddPatient, onClose, newPatient, studyId, errorList } = this.props;
    /* will only submit the form if the error list is empty */
    if (Object.keys(errorList).length === 0) {
      /* normalizing the phone number */
      newPatient.phone = normalizePhone(newPatient.phone);
      submitAddPatient(studyId, newPatient, onClose);
    }
  }

  render() {
    const { onHide, ...props } = this.props;
    return (
      <Modal
        {...props}
        id="add-patient-info-import"
        dialogComponentClass={CenteredModal}
        backdrop
        keyboard
      >
        <Modal.Header>
          <Modal.Title>
            <strong>Import</strong>
          </Modal.Title>
          <a className="close" onClick={onHide}>
            <i className="icomoon-icon_close" />
          </a>
        </Modal.Header>
        <Modal.Body>
          <div className="scroll-holder jcf--scrollable">
            <Form className="form-lightbox" noValidate="novalidate">
              <div className="field-row">
                <strong className="label required">
                  <label htmlFor="import-patient-first-name">Patient Name</label></strong>
                <div className="field">
                  <div className="row">
                    <Field
                      name="firstName"
                      component={Input}
                      type="text"
                      placeholder="First Name"
                      className="col pull-left"
                      id="import-patient-first-name"
                      required
                    />
                    <Field
                      name="lastName"
                      component={Input}
                      type="text"
                      placeholder="Last Name"
                      className="col pull-left"
                      id="import-patient-last-name"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="field-row">
                <strong className="label required">
                  <label htmlFor="import-patient-email"> Patient Email </label>
                </strong>
                <Field
                  name="email"
                  component={Input}
                  type="text"
                  className="field"
                  id="import-patient-email"
                  required
                />
              </div>
              <div className="field-row">
                <strong className="label required">
                  <label htmlFor="import-patient-phone"> Patient Phone </label>
                </strong>
                <Field
                  name="phone"
                  component={Input}
                  type="tel"
                  maxLength="11"
                  className="field"
                  id="import-patient-phone"
                  required
                />
              </div>
              <div className="text-right">
                <Button onClick={(event) => this.addPatient(event)}>Submit</Button>
              </div>
            </Form>
          </div>
        </Modal.Body>
      </Modal>
    );
  }
}


const mapStateToProps = createStructuredSelector({
  newPatient: selectValues(formName),
  errorList: selectSyncErrors(formName),
  studyId: selectStudyId(),
});

function mapDispatchToProps(dispatch) {
  return {
    submitAddPatient: (studyId, patient, onClose) => dispatch(submitAddPatient(studyId, patient, onClose)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddPatient);
