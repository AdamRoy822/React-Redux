/**
 *
 * Add New Card Form
 *
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Field, reduxForm } from 'redux-form';

import Input from 'components/Input';
import ReactSelect from 'components/Input/ReactSelect';
import { selectAddNewCardFormError } from './selectors';
import { selectSavedCard } from 'containers/App/selectors';
import formValidator from './validator';
import LoadingSpinner from 'components/LoadingSpinner';
import { MONTH_OPTIONS as monthOptions, YEAR_OPTIONS as yearOptions } from 'common/constants';
import './styles.less';

const mapStateToProps = createStructuredSelector({
  savedCard: selectSavedCard(),
  hasError: selectAddNewCardFormError(),
});

@reduxForm({ form: 'addNewCard', validate: formValidator })
@connect(mapStateToProps, null)

class AddNewCardForm extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    savedCard: PropTypes.object,
    hasError: PropTypes.bool,
    handleSubmit: PropTypes.func,
  };

  render() {
    const { savedCard, hasError, handleSubmit } = this.props;

    return (
      <form className="form-add-new-card" onSubmit={handleSubmit}>
        <div className="add-new-card scroll-holder jcf--scrollable">
          <div className="row form-group">
            <strong className="required col-sm-4">
              <label>COMPANY</label>
            </strong>
            <div className="field col-sm-8">
              <Field
                name="company"
                component={Input}
                type="text"
                disabled={savedCard.saving}
              />
            </div>
          </div>
          <div className="row form-group">
            <strong className="required col-sm-4">
              <label>NAME ON CARD</label>
            </strong>
            <div className="field col-sm-8">
              <div className="row">
                <div className="col-sm-6">
                  <Field
                    name="firstName"
                    component={Input}
                    type="text"
                    placeholder="First Name"
                    disabled={savedCard.saving}
                  />
                </div>
                <div className="col-sm-6">
                  <Field
                    name="lastName"
                    component={Input}
                    type="text"
                    placeholder="Last Name"
                    disabled={savedCard.saving}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="row form-group">
            <strong className="required col-sm-4">
              <label>CARD NUMBER</label>
            </strong>
            <div className="field col-sm-8">
              <Field
                name="number"
                component={Input}
                type="text"
                disabled={savedCard.saving}
              />
            </div>
          </div>
          <div className="row form-group">
            <strong className="required col-sm-4">
              <label>EXPIRATION</label>
            </strong>
            <div className="field col-sm-8">
              <div className="row">
                <div className="col-sm-6">
                  <Field
                    name="expirationMonth"
                    component={ReactSelect}
                    placeholder="Select Month"
                    options={monthOptions}
                    disabled={savedCard.saving}
                  />
                </div>
                <div className="col-sm-6">
                  <Field
                    name="expirationYear"
                    component={ReactSelect}
                    placeholder="Select Year"
                    options={yearOptions}
                    disabled={savedCard.saving}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="row form-group">
            <strong className="col-sm-4">
              <label>CVC</label>
            </strong>
            <div className="field col-sm-8">
              <Field
                name="cvc"
                component={Input}
                type="text"
                disabled={savedCard.saving}
              />
            </div>
          </div>
          <div className="row form-group">
            <strong className="required col-sm-4">
              <label>BILLING POSTAL CODE</label>
            </strong>
            <div className="field col-sm-8">
              <Field
                name="billingPostalCode"
                component={Input}
                type="text"
                disabled={savedCard.saving}
              />
            </div>
          </div>
          <div className="btn-block text-right">
            <button type="submit" className="btn btn-default btn-add-row" disabled={hasError || savedCard.saving}>
              {savedCard.saving
                ? <span><LoadingSpinner showOnlyIcon size={20} className="saving-card" /></span>
                : <span>Submit</span>
              }
            </button>
          </div>
        </div>
      </form>
    );
  }
}

export default AddNewCardForm;
