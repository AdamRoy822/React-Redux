/**
*
* RewardForm
*
*/

import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';

import ReactSelect from 'components/Input/ReactSelect';
import formValidator from './validator';

@reduxForm({ form: 'reward', validate: formValidator })
class RewardForm extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    siteLocations: PropTypes.array,
  };

  render() {
    const { siteLocations } = this.props;

    return (
      <div>
        <Field
          name="site"
          component={ReactSelect}
          placeholder="Select Site Location"
          options={siteLocations}
          className="field"
        />
      </div>
    );
  }
}

export default RewardForm;
