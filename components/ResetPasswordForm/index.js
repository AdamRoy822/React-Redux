/**
*
* ResetPasswordForm
*
*/

import React from 'react';
import { Field, reduxForm } from 'redux-form';
import Input from 'components/Input';
import resetPasswordFormValidator from './validator';
import { FormGroup, Col } from 'react-bootstrap';

@reduxForm({
  form: 'resetPassword',
  validate: resetPasswordFormValidator,
})
class ResetPasswordForm extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    handleSubmit: React.PropTypes.func.isRequired,
    submitting: React.PropTypes.bool.isRequired,
  };

  render() {
    const { handleSubmit, submitting } = this.props;

    return (
      <form
        onSubmit={handleSubmit}
        className="form-horizontal"
      >
        <FormGroup>
          <Field
            name="email"
            type="text"
            component={Input}
            placeholder="Email"
            className="col-sm-12"
          />
        </FormGroup>

        <FormGroup>

          <Col sm={6} smPush={6}>
            <button
              type="submit"
              disabled={submitting}
              className="btn btn-default pull-right"
            >
              Submit
            </button>
          </Col>


        </FormGroup>

      </form>
    );
  }
}

export default ResetPasswordForm;
