import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Field, FieldArray, change, reduxForm } from 'redux-form';

import Input from 'components/Input';
import { selectCurrentUserClientId } from 'containers/App/selectors';
import { selectEditStudyFormValues, selectEditStudyFormError } from './selectors';
import { selectEditedStudy } from 'containers/HomePage/selectors';
import RenderEmailsList from './RenderEmailsList';
import formValidator from './validator';
import LoadingSpinner from 'components/LoadingSpinner';

const mapStateToProps = createStructuredSelector({
  currentUserClientId: selectCurrentUserClientId(),
  formValues: selectEditStudyFormValues(),
  hasError: selectEditStudyFormError(),
  editedStudy: selectEditedStudy(),
});

@reduxForm({ form: 'editStudy', validate: formValidator })
@connect(mapStateToProps)

class EditStudyForm extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    currentUserClientId: PropTypes.number,
    formValues: PropTypes.object,
    hasError: PropTypes.bool,
    editedStudy: PropTypes.object,
    siteUsers: PropTypes.array,
    handleSubmit: PropTypes.func,
  };

  componentWillMount() {
    this.props.dispatch(change('editStudy', 'emailNotifications', this.props.siteUsers));
  }

  render() {
    const { formValues, hasError, editedStudy, handleSubmit } = this.props;

    return (
      <form className="form-edit-study" onSubmit={handleSubmit}>
        <div className="edit-study form-fields">
          <div className="field-row">
            <strong className="label required">
              <label>RECRUITMENT PHONE</label>
            </strong>
            <div className="field">
              <Field
                name="recruitmentPhone"
                component={Input}
                type="text"
              />
            </div>
          </div>
          <div className="field-row">
            <strong className="label required">
              <label>EMAIL NOTIFICATIONS</label>
            </strong>
            <div className="field">
              <div className="emails-list-holder">
                <FieldArray
                  name="emailNotifications"
                  component={RenderEmailsList}
                  formValues={formValues}
                  dispatch={this.props.dispatch}
                />
              </div>
            </div>
          </div>
          <div className="field-row">
            <strong className="label required">
              <label>STUDY AD</label>
            </strong>
            <div className="field">
              <label htmlFor="study-ad" data-text="Browse" data-hover-text="Attach File" className="btn btn-gray upload-btn"></label>
              <Field
                id="study-ad"
                name="studyAd"
                component={Input}
                type="file"
                className="hidden"
              />
            </div>
          </div>
          <div className="clearfix">
            <button type="submit" className="btn btn-default btn-submit pull-right" disabled={hasError || editedStudy.submitting}>
              {editedStudy.submitting
                ? <span><LoadingSpinner showOnlyIcon size={20} className="submitting-edit-study" /></span>
                : <span>Submit</span>
              }
            </button>
          </div>
        </div>
      </form>
    );
  }
}

export default EditStudyForm;
