/**
*
* ReferForm
*
*/

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Field, FieldArray, reduxForm, change } from 'redux-form';

import Input from 'components/Input';
import Toggle from 'components/Input/Toggle';
import ReactSelect from 'components/Input/ReactSelect';
import RenderLeads from 'components/RenderLeads';

import { CAMPAIGN_LENGTH_LIST } from 'common/constants';
import {
  selectCallTracking,
  selectLeadsCount,
} from './selectors';
import formValidator from './validator';

const mapStateToProps = createStructuredSelector({
  callTracking: selectCallTracking(),
  leadsCount: selectLeadsCount(),
});

@reduxForm({ form: 'requestProposal', validate: formValidator })
@connect(mapStateToProps)
class RequestProposalForm extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    siteLocations: PropTypes.array,
    indications: PropTypes.array,
    studyLevels: PropTypes.array,
    callTracking: PropTypes.bool,
    leadsCount: PropTypes.number,
  };

  componentWillReceiveProps(newProps) {
    // If leads are all removed, set `callTracking` value to false
    if (newProps.leadsCount === 0 && this.props.leadsCount === 1) {
      this.props.dispatch(change('requestProposal', 'callTracking', false));
    }
  }

  render() {
    const { siteLocations, indications, studyLevels } = this.props;
    const { callTracking } = this.props;

    return (
      <div className="form-study">
        <div className="form-fields">
          <div className="field-row">
            <strong className="label required"><label>Site Location</label></strong>
            <Field
              name="site"
              component={ReactSelect}
              placeholder="Select Site Location"
              options={siteLocations}
              className="field"
            />
          </div>

          <div className="field-row">
            <strong className="label required"><label>Indication</label></strong>
            <Field
              name="indication_id"
              component={ReactSelect}
              placeholder="Select Indication"
              options={indications}
              className="field"
            />
          </div>

          <div className="field-row">
            <strong className="label required"><label>Protocol</label></strong>
            <Field
              name="protocol"
              component={Input}
              type="text"
              className="field"
            />
          </div>

          <div className="field-row">
            <strong className="label"><label>Sponsor Name</label></strong>
            <Field
              name="sponsorName"
              component={Input}
              type="text"
              className="field"
            />
          </div>

          <div className="field-row">
            <strong className="label"><label>Sponsor Email</label></strong>
            <Field
              name="sponsorEmail"
              component={Input}
              type="email"
              className="field"
            />
          </div>

          <div className="field-row">
            <strong className="label"><label>CRO Name</label></strong>
            <Field
              name="croName"
              component={Input}
              type="text"
              className="field"
            />
          </div>

          <div className="field-row">
            <strong className="label"><label>CRO Email</label></strong>
            <Field
              name="croEmail"
              component={Input}
              type="email"
              className="field"
            />
          </div>

          <div className="field-row">
            <strong className="label"><label>IRB Name</label></strong>
            <Field
              name="irbName"
              component={Input}
              type="text"
              className="field"
            />
          </div>

          <div className="field-row">
            <strong className="label"><label>IRB Email</label></strong>
            <Field
              name="irbEmail"
              component={Input}
              type="email"
              className="field"
            />
          </div>

          <div className="field-row">
            <strong className="label required"><label>Exposure Level</label></strong>
            <Field
              name="level_id"
              component={ReactSelect}
              placeholder="Select Exposure Level"
              options={studyLevels}
              className="field"
            />
          </div>

          <div className="field-row">
            <strong className="label required"><label>Campaign Length</label></strong>
            <Field
              name="campaignLength"
              component={ReactSelect}
              placeholder="Select Campaign Length"
              options={CAMPAIGN_LENGTH_LIST}
              className="field top-positioned"
            />
          </div>

          <div className="field-row">
            <strong className="label"><label>Patient messaging <br />
            Suite: $247</label></strong>
            <Field
              name="addPatientMessagingSuite"
              component={Toggle}
              className="field"
            />
          </div>

          {false &&
            <div className="tracking-source">
              <div className="field-row">
                <strong className="label"><label>CALL TRACKING: $247</label></strong>
                <Field
                  name="callTracking"
                  component={Toggle}
                  className="field"
                />
              </div>
            </div>
          }

          {callTracking &&
            <FieldArray name="leads" component={RenderLeads} />
          }

          <div className="field-row">
            <strong className="label required"><label>Start Date</label></strong>
            <Field
              name="startDate"
              component={Input}
              type="date"
              className="field"
            />
          </div>

        </div>
      </div>
    );
  }
}

export default RequestProposalForm;
