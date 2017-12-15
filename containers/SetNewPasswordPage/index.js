/*
 *
 * SetNewPasswordPage
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import SetNewPasswordForm from 'components/SetNewPasswordForm';
import { setNewPasswordRequest } from './actions';

export class SetNewPasswordPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    onSubmitForm: React.PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.onSubmitForm = this.props.onSubmitForm.bind(this);
  }

  render() {
    return (
      <div>
        <div className="login-page-wrapper">
          <Helmet title="Reset Password" />
          <div className="row">
            <div className="col-md-4 col-md-push-4">
              <div className="login-block">
                <div className="text-center">
                  <h3>Enter New Password</h3>
                </div>
                <br />

                <SetNewPasswordForm onSubmit={this.onSubmitForm} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({

});

function mapDispatchToProps(dispatch) {
  return {
    onSubmitForm: (values) => dispatch(setNewPasswordRequest(values)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SetNewPasswordPage);
