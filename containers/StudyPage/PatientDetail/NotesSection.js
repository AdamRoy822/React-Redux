/**
 * Created by mike on 10/14/16.
 */

import React from 'react';
import { connect } from 'react-redux';
import { Field, formValueSelector, reduxForm, reset } from 'redux-form';
import Button from 'react-bootstrap/lib/Button';
import classNames from 'classnames';

import { submitPatientNote, submitDeleteNote } from '../actions';
import Input from '../../../components/Input/index';
import PatientNote from './PatientNote';

const formName = 'PatientDetailModal.Notes';

@reduxForm({ form: formName })
class NotesSection extends React.Component {
  static propTypes = {
    active: React.PropTypes.bool.isRequired,
    currentUser: React.PropTypes.object.isRequired,
    currentPatient: React.PropTypes.object,
    studyId: React.PropTypes.number.isRequired,
    note: React.PropTypes.string,
    resetForm: React.PropTypes.func.isRequired,
    submitPatientNote: React.PropTypes.func.isRequired,
    submitDeleteNote: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.renderNotes = this.renderNotes.bind(this);
  }

  onClick() {
    const { currentPatient, currentUser, note, resetForm, studyId, submitPatientNote } = this.props;
    submitPatientNote(studyId, currentPatient.id, currentUser, note);
    resetForm();
  }

  renderNotes() {
    const { currentUser, currentPatient, submitDeleteNote } = this.props;
    if (currentPatient && currentPatient.notes) {
      return currentPatient.notes.map(note => (
        <PatientNote key={note.id} currentUser={currentUser} note={note} currentPatient={currentPatient} submitDeleteNote={submitDeleteNote} />
      ));
    }
    return null;
  }

  render() {
    const { active } = this.props;
    return (
      <div className={classNames('item note', { active })}>
        <section className="postarea notes">
          {this.renderNotes()}
        </section>
        <div className="textarea">
          <Field name="note" component={Input} componentClass="textarea" placeholder="Type a note..." />
          <Button onClick={this.onClick}>Send</Button>
        </div>
      </div>
    );
  }
}

const selector = formValueSelector(formName);

const mapStateToProps = state => (
  {
    note: selector(state, 'note'),
  }
);

function mapDispatchToProps(dispatch) {
  return {
    submitPatientNote: (studyId, patientId, currentUser, note) => dispatch(submitPatientNote(studyId, patientId, currentUser, note)),
    submitDeleteNote: (patientId, noteId) => dispatch(submitDeleteNote(patientId, noteId)),
    resetForm: () => dispatch(reset(formName)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NotesSection);
