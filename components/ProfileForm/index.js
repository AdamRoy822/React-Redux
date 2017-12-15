/**
*
* ProfileForm
*
*/

import React from 'react';
import { Field, reduxForm } from 'redux-form'; // eslint-disable-line
import { Modal } from 'react-bootstrap';
import Input from 'components/Input';
import ChangePasswordForm from 'components/ChangePasswordForm';
import ProfileImageForm from 'components/ProfileImageForm';
import defaultImage from 'assets/images/Default-User-Img-Dr.png';
import './styles.less';
import 'blueimp-canvas-to-blob';
import CenteredModal from 'components/CenteredModal/index';

@reduxForm({ form: 'profile' })
class ProfileForm extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    currentUser: React.PropTypes.object,
    changePassword: React.PropTypes.func,
    changeImage: React.PropTypes.func,
    changePasswordResult: React.PropTypes.object,
    me: React.PropTypes.bool,
  };

  constructor(props) {
    super(props);
    this.openResetPasswordModal = this.openResetPasswordModal.bind(this);
    this.closeResetPasswordModal = this.closeResetPasswordModal.bind(this);
    this.openProfileImageModal = this.openProfileImageModal.bind(this);
    this.closeProfileImageModal = this.closeProfileImageModal.bind(this);
    this.uploadImage = this.uploadImage.bind(this);

    this.state = {
      passwordResetModalOpen: false,
      profileImageModalOpen: false,
    };
  }

  componentWillReceiveProps(newProps) {
    if (!newProps.changePasswordResult.passwordChanging && this.props.changePasswordResult.passwordChanging) {
      this.closeResetPasswordModal();
    }
  }

  openResetPasswordModal() {
    this.setState({ passwordResetModalOpen: true });
  }

  closeResetPasswordModal() {
    this.setState({ passwordResetModalOpen: false });
  }

  openProfileImageModal() {
    this.setState({ profileImageModalOpen: true });
  }

  closeProfileImageModal() {
    this.setState({ profileImageModalOpen: false });
  }

  uploadImage(e) {
    e.toBlob((blob) => {
      this.props.changeImage({ file: blob, user_id: this.props.currentUser.id });
      this.closeProfileImageModal();
    });
  }

  render() {
    const { me } = this.props;
    const initialValues = {
      initialValues: {
        user_id: this.props.currentUser.id,
      },
    };
    return (
      <form className="form-study">


        <div className="field-row label-top file-img active">
          <strong className="label"><label htmlFor="profile-img">PROFILE IMAGE</label></strong>
          <div className="field">
            <div className="profile-image">
              <label htmlFor="profile-img" className="image">
                <span>
                  <img src={this.props.currentUser.profileImageURL || defaultImage} alt="" /><br />
                </span>
              </label>
            </div>
          </div>
        </div>

        <div className="field-row">
          <strong className="label"></strong>
          <div className="field">
            <a href="#" className="btn btn-gray upload-btn lightbox-opener" onClick={this.openProfileImageModal}>Update Profile Image</a>
          </div>
        </div>

        <div className="field-row">
          <strong className="label"><label>NAME</label></strong>
          <div className="field">
            <div className="row">
              <Field
                name="firstName"
                component={Input}
                type="text"
                className="col pull-left"
                isDisabled
              />
              <Field
                name="lastName"
                component={Input}
                type="text"
                placeholder="Last Name"
                className="col pull-right"
                isDisabled
              />
            </div>
          </div>
        </div>

        <div className="field-row">
          <strong className="label"><label>Email</label></strong>
          <Field
            name="email"
            component={Input}
            disabled="true"
            type="text"
            placeholder="Email"
            className="field"
            isDisabled
          />
        </div>

        <div className="field-row">
          <strong className="label"><label>PASSWORD</label></strong>
          <a className="btn btn-primary lightbox-opener profile-page-edit-password-btn" onClick={this.openResetPasswordModal} disabled={!me}>EDIT</a>
        </div>


        <Modal className="custom-modal" dialogComponentClass={CenteredModal} show={this.state.passwordResetModalOpen} onHide={this.closeResetPasswordModal}>
          <Modal.Header>
            <Modal.Title>CHANGE PASSWORD</Modal.Title>
            <a className="lightbox-close close" onClick={this.closeResetPasswordModal}>
              <i className="icomoon-icon_close"></i>
            </a>
          </Modal.Header>
          <Modal.Body>
            <ChangePasswordForm {...initialValues} onSubmit={this.props.changePassword} />
          </Modal.Body>
        </Modal>

        <Modal className="custom-modal avatar-modal" dialogComponentClass={CenteredModal} show={this.state.profileImageModalOpen} onHide={this.closeProfileImageModal}>
          <Modal.Header>
            <Modal.Title>UPDATE PROFILE IMAGE</Modal.Title>
            <a className="lightbox-close close" onClick={this.closeProfileImageModal}>
              <i className="icomoon-icon_close"></i>
            </a>
          </Modal.Header>
          <Modal.Body>
            <ProfileImageForm {...initialValues} handleSubmit={this.uploadImage} />
          </Modal.Body>
        </Modal>

      </form>
    );
  }
}

export default ProfileForm;
