/**
*
* ConfirmPasswordChangeForm
*
*/

import React from 'react';
import { FormGroup, Col } from 'react-bootstrap';
import { confirmChangePasswordRequest } from 'containers/ProfilePage/actions';
import { connect } from 'react-redux';

function mapDispatchToProps(dispatch) {
  return {
    confirmPasswordChange: () => dispatch(confirmChangePasswordRequest()),
  };
}

@connect(null, mapDispatchToProps)
class ConfirmPasswordChangeForm extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    confirmPasswordChange: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.confirmPasswordChange = this.props.confirmPasswordChange.bind(this);
  }

  render() {
    return (

      <div className="container-fluid">
        <section className="study-portal">

          <h2 className="main-heading">Password Change</h2>

          <div className="row form-study">

            <div className="col-xs-6 form-holder">
              <div
                className="form-horizontal"
              >
                <FormGroup>
                  <strong className="label"><label>Please confirm password change.</label></strong>
                </FormGroup>

                <FormGroup>

                  <Col sm={6}>
                    <button
                      type="submit"
                      className="btn btn-default pull-left"
                      onClick={this.confirmPasswordChange}
                    >
                      Confirm
                    </button>
                  </Col>

                </FormGroup>

              </div>
            </div>
          </div>
        </section>
      </div>

    );
  }
}

export default ConfirmPasswordChangeForm;
