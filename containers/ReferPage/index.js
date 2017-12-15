/*
 *
 * ReferPage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Helmet from 'react-helmet';

import ReferForm from 'components/ReferForm';

import { selectCompanyTypes } from 'containers/ReferPage/selectors';
import { submitForm, fetchCompanyTypes } from 'containers/ReferPage/actions';

import manImage from 'assets/images/man.svg';
import shadowImage from 'assets/images/shadow.png';

export class ReferPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    companyTypes: PropTypes.array,
    fetchCompanyTypes: PropTypes.func,
    onSubmitForm: PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.onSubmitForm = this.props.onSubmitForm.bind(this);
  }

  componentDidMount() {
    this.props.fetchCompanyTypes();
  }

  render() {
    const { companyTypes } = this.props;

    return (
      <div className="container-fluid">
        <Helmet title="Refer - StudyKIK" />
        <section className="study-portal">

          <h2 className="main-heading">REFER</h2>

          <div className="row form-study">

            <div className="refer-info pull-right">
              <div className="refer-holder">
                <div className="textbox text-center pull-left">
                  <strong className="title">
                    Refer a new site<br />
                    or Sponsor/CRO<br />
                    project manager by <br />
                    entering their contact!
                  </strong>
                  <p>
                    When they list a Platinum Study or<br />
                    higher, you will receive 100 reward <br />
                    KIK’s. If they list a multi-site (10+) <br />
                    central recruitment you will <br />
                    receive 300 <br />
                    reward KIKs!
                  </p>
                </div>
                <div className="img-holder pull-left">
                  <img src={manImage} alt="" width="256" />
                  <img className="shadow" src={shadowImage} alt="&nbsp;" width="212" height="39" />
                </div>
              </div>
            </div>

            <div className="form-holder ovh">
              <ReferForm companyTypes={companyTypes} onSubmit={this.onSubmitForm} />
            </div>

          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  companyTypes: selectCompanyTypes(),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchCompanyTypes: () => dispatch(fetchCompanyTypes()),
    onSubmitForm: (values) => dispatch(submitForm(values)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ReferPage);
