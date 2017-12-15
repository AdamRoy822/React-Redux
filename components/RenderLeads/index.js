/**
*
* Array of lead sources
*
*/

import React, { PropTypes } from 'react';

import { Field } from 'redux-form';

import Input from 'components/Input';
import ReactSelect from 'components/Input/ReactSelect';

import {
  LEAD_SOURCE_LIST,
} from 'common/constants';

import './styles.less';

const RenderLeads = ({ fields, availPhoneNumbers }) => (
  <div className="leads-list">
    {fields.map((lead, index) =>
      <div className="lead-item" key={index}>
        <div className="field-row">
          <strong className="label required"><label>Lead Source</label></strong>
          <Field
            name={`${lead}.source_id`}
            component={ReactSelect}
            placeholder="Select Lead Source"
            options={LEAD_SOURCE_LIST}
            className="field"
          />
          <button className="link-delete" onClick={() => fields.remove(index)}>
            <i className="icomoon-icon_trash" />
          </button>
        </div>

        {(() => {
          if (availPhoneNumbers) {
            return (
              <div className="field-row">
                <strong className="label required"><label>Phone number</label></strong>
                <Field
                  name={`${lead}.source_phone`}
                  component={ReactSelect}
                  placeholder="Select Phone Number"
                  options={availPhoneNumbers}
                  className="field"
                />
              </div>
            );
          }
          return false;
        })()}

        <div className="field-row">
          <strong className="label required"><label>Source Name</label></strong>
          <Field
            name={`${lead}.source_name`}
            component={Input}
            type="text"
            className="field"
          />
        </div>
      </div>
    )}
    <div className="field-row">
      <strong className="label"></strong>
      <div className="field">
        <button
          className="add-new-source"
          onClick={() => fields.push({})}
        >
          <i className="icomoon-icon_close"></i> Add Lead Source
        </button>
      </div>
    </div>
  </div>
);

RenderLeads.propTypes = {
  fields: PropTypes.object,
  availPhoneNumbers: PropTypes.array,
};

export default RenderLeads;
