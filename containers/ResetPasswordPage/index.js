/*
 *
 * ResetPasswordPage
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { resetPasswordRequest } from './actions';
import ResetPasswordForm from 'components/ResetPasswordForm';
import 'containers/LoginPage/styles.less';

export class ResetPasswordPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    onSubmitForm: React.PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.onSubmitForm = this.props.onSubmitForm.bind(this);
  }
  render() {
    return (
      <div className="login-page-wrapper">
        <Helmet title="Reset Password" />
        <div className="row">
          <div className="col-md-4 col-md-push-4">
            <div className="login-block">
              <div className="text-center">
                <h3>Reset Password</h3>
              </div>
              <br />

              <ResetPasswordForm onSubmit={this.onSubmitForm} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onSubmitForm: (values) => dispatch(resetPasswordRequest(values)),
  };
}

export default connect(null, mapDispatchToProps)(ResetPasswordPage);
