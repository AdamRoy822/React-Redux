/**
 * Created by mike on 10/23/16.
 */

import React from 'react';
import { Field } from 'redux-form';
import ReactSelect from '../Input/ReactSelect';
import moment from 'moment-timezone';

class DateOfBirthPicker extends React.Component {
  static propTypes = {
    dobMonth: React.PropTypes.number,
    dobDay: React.PropTypes.number,
    dobYear: React.PropTypes.number,
    loading: React.PropTypes.bool,
    submitting: React.PropTypes.bool,
  };

  componentDidMount() {
  }

  render() {
    const { loading, submitting } = this.props;
    const now = moment();
    const monthOptions = moment.monthsShort();
    for (let index = 0; index < 12; index++) {
      const month = monthOptions[index];
      monthOptions[index] = {
        label: month,
        value: index + 1,
      };
    }
    const dayOptions = [];
    for (let day = 1; day < 32; day++) {
      dayOptions.push({
        label: day,
        value: day,
      });
    }
    const nowYear = now.year();
    const yearOptions = [];
    for (let year = nowYear; year > 1900; year--) {
      yearOptions.push({
        label: year,
        value: year,
      });
    }
    return (
      <div className="field-row">
        <strong className="label"><label htmlFor="patient-dob">Date of Birth</label></strong>
        <div className="field">
          <div className="row">
            <div className="col-small pull-left">
              <Field
                name="dobMonth"
                component={ReactSelect}
                className="min-height"
                options={monthOptions}
                disabled={submitting || loading}
                placeholder="Month"
              />
            </div>
            <div className="col-small pull-left">
              <Field
                name="dobDay"
                component={ReactSelect}
                className="min-height"
                options={dayOptions}
                disabled={submitting || loading}
                placeholder="Day"
              />
            </div>
            <div className="col-small pull-left">
              <Field
                name="dobYear"
                component={ReactSelect}
                className="min-height"
                disabled={submitting || loading}
                options={yearOptions}
                placeholder="Year"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DateOfBirthPicker;
