/**
 * Created by mike on 10/4/16.
 */

import React from 'react';
import Modal from 'react-bootstrap/lib/Modal';
import CenteredModal from '../../components/CenteredModal/index';

class AlertModal extends React.Component {
  static propTypes = {
    show: React.PropTypes.bool.isRequired,
    onHide: React.PropTypes.func.isRequired,
  };

  componentDidMount() {
  }

  render() {
    const { ...props } = this.props;
    return (
      <Modal
        {...props}
        id="patient-database-alert"
        dialogComponentClass={CenteredModal}
        backdrop
        keyboard
      >

        <Modal.Body>
          <div className="patient-database-alert-lightbox-content text-center">
            <p>
              Please select patient(s).
            </p>
            <div className="btn-block">
              <a className="btn btn-default lightbox-close" onClick={this.props.onHide}>OK</a>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    );
  }
}

export default AlertModal;
