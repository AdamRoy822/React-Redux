/*
 *
 * ProfilePage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import ProfileForm from 'components/ProfileForm';
import { selectChangePasswordResult, selectOtherUser } from 'containers/ProfilePage/selectors';
import { selectCurrentUser } from 'containers/App/selectors';
import { changePassword, changeImage, fetchOtherUser } from 'containers/ProfilePage/actions';
import { createStructuredSelector } from 'reselect';
import Helmet from 'react-helmet';

export class ProfilePage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    changePasswordResult: PropTypes.object,
    changePassword: PropTypes.func,
    changeImage: PropTypes.func,
    fetchOtherUser: PropTypes.func,
    currentUser: PropTypes.any,
    otherUser: PropTypes.any,
    params: PropTypes.object,
  }

  constructor(props) {
    super(props);

    this.changePassword = this.props.changePassword.bind(this);
    this.changeImage = this.props.changeImage.bind(this);
  }

  componentDidMount() {
    const { userId } = this.props.params;
    if (userId !== 'me') {
      this.props.fetchOtherUser({ userId });
    }
  }

  render() {
    const me = this.props.params.userId === 'me';

    return (
      <div className="container-fluid">
        <Helmet title="Profile - StudyKIK" />
        <section className="study-portal">

          <h2 className="main-heading">PROFILE</h2>

          <div className="row form-study">

            <div className="col-xs-6 form-holder">
              {(() => {
                const initialValues = {
                  initialValues: me ? this.props.currentUser : this.props.otherUser.info,
                };

                return (me || this.props.otherUser.info) && <ProfileForm
                  {...initialValues}
                  changePasswordResult={this.props.changePasswordResult}
                  changePassword={this.changePassword}
                  changeImage={this.changeImage}
                  currentUser={me ? this.props.currentUser : this.props.otherUser.info}
                  me={me}
                />;
              })()}
            </div>
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  changePasswordResult: selectChangePasswordResult(),
  currentUser: selectCurrentUser(),
  otherUser: selectOtherUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    changePassword: (values) => dispatch(changePassword(values)),
    changeImage: (values) => dispatch(changeImage(values)),
    fetchOtherUser: (userId) => dispatch(fetchOtherUser(userId)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
