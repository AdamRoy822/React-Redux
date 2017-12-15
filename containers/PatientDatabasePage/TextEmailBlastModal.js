/**
 * Created by mike on 10/4/16.
 */

import React from 'react';
import Modal from 'react-bootstrap/lib/Modal';
import CenteredModal from '../../components/CenteredModal/index';

class TextEmailBlastModal extends React.Component {
  static propTypes = {
    show: React.PropTypes.bool.isRequired,
    onHide: React.PropTypes.func.isRequired,
    toggleTextBlast: React.PropTypes.func.isRequired,
  };

  componentDidMount() {
  }

  render() {
    const { toggleTextBlast, ...props } = this.props;
    return (
      <Modal
        {...props}
        id="text-email-blast"
        dialogComponentClass={CenteredModal}
        backdrop
        keyboard
      >
        <Modal.Header>
          <Modal.Title>
            <strong>Text / Email Blast</strong>
          </Modal.Title>
          <a className="close" onClick={props.onHide}>
            <i className="icomoon-icon_close" />
          </a>
        </Modal.Header>
        <Modal.Body>
          <span className="modal-opener" onClick={toggleTextBlast}>
            <div className="table">
              <div className="table-cell">
                <i className="icomoon-icon_comment_alt" />
                <span className="text">Text Blast</span>
              </div>
            </div>
          </span>
          <span className="or">
            <span className="text">OR</span>
          </span>
          <span className="modal-opener">
            <div className="table">
              <div className="table-cell">
                <i className="icomoon-envelop" />
                <span className="text">Email Blast</span>
              </div>
            </div>
          </span>
        </Modal.Body>
      </Modal>
    );
  }
}

export default TextEmailBlastModal;
