/**
 * Created by mike on 10/2/16.
 */

import React from 'react';
import TextEmailBlastModal from './TextEmailBlastModal';
import AlertModal from './AlertModal';
import TextBlastModal from './TextBlast/index';
import { createStructuredSelector } from 'reselect';
import { selectValues } from '../../common/selectors/form.selector';
import { connect } from 'react-redux';
import { importPatients } from '../../containers/PatientDatabasePage/actions';

class PatientActionButtons extends React.Component {
  static propTypes = {
    formValues: React.PropTypes.object,
    importPatients: React.PropTypes.func,
    searchPatients: React.PropTypes.func,
    paginationOptions: React.PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
      showImportPatientsModal: false,
      showAddPatientModal: false,
      showTextEmailBlastModal: false,
      showTextBlastModal: false,
      showEmailBlastModal: false,
      showAlertModal: false,
    };
    this.toggleImportPatientsModal = this.toggleImportPatientsModal.bind(this);
    this.toggleAddPatientModal = this.toggleAddPatientModal.bind(this);
    this.closeAddPatientModal = this.closeAddPatientModal.bind(this);
    this.toggleTextEmailBlastModal = this.toggleTextEmailBlastModal.bind(this);
    this.toggleAlertModal = this.toggleAlertModal.bind(this);
    this.toggleTextBlastModal = this.toggleTextBlastModal.bind(this);
    this.closeTextBlastModal = this.closeTextBlastModal.bind(this);
    this.toggleEmailBlastModal = this.toggleEmailBlastModal.bind(this);
    this.closeEmailBlastModal = this.closeEmailBlastModal.bind(this);
    this.download = this.download.bind(this);
    this.uploadFile = this.uploadFile.bind(this);
  }

  toggleImportPatientsModal() {
    this.setState({
      showImportPatientsModal: !this.state.showImportPatientsModal,
    });
  }

  toggleAddPatientModal() {
    this.setState({
      showImportPatientsModal: !this.state.showImportPatientsModal,
      showAddPatientModal: !this.state.showAddPatientModal,
    });
  }

  closeAddPatientModal() {
    this.setState({
      showImportPatientsModal: false,
      showAddPatientModal: false,
    });
  }

  toggleAlertModal() {
    this.setState({
      showAlertModal: !this.state.showAlertModal,
    });
  }

  toggleTextEmailBlastModal() {
    if (!this.props.formValues.patients || this.props.formValues.patients.length === 0) {
      this.setState({
        showAlertModal: true,
      });
    } else {
      this.setState({
        showTextEmailBlastModal: !this.state.showTextEmailBlastModal,
      });
    }
  }

  toggleTextBlastModal() {
    this.setState({
      showTextEmailBlastModal: !this.state.showTextEmailBlastModal,
      showTextBlastModal: !this.state.showTextBlastModal,
    });
  }

  closeTextBlastModal() {
    this.setState({
      showTextEmailBlastModal: false,
      showTextBlastModal: false,
    });
  }

  toggleEmailBlastModal() {
    this.setState({
      showTextEmailBlastModal: !this.state.showTextEmailBlastModal,
      showEmailBlastModal: !this.state.showEmailBlastModal,
    });
  }

  closeEmailBlastModal() {
    this.setState({
      showTextEmailBlastModal: false,
      showEmailBlastModal: false,
    });
  }

  download() {
    this.props.searchPatients(this.props.paginationOptions.prevSearchFilter, true, true);
  }

  uploadFile(e) {
    if (e.target.files[0]) {
      this.props.importPatients(e.target.files[0]);
      this.fileBttn.value = '';
    }
  }

  render() {
    return (
      <div className="btns-popups">
        <div className="col pull-right">
          <a onClick={this.download} className="btn btn-primary download"><i className="icomoon-icon_download"></i> Download</a>
        </div>
        <div className="col pull-right">
          <label htmlFor="file" className="btn btn-primary import lightbox-opener"><i className="icomoon-icon_upload"></i> Import</label>
          <input
            type="file"
            id="file"
            onChange={this.uploadFile}
            ref={(fileBttn) => {
              this.fileBttn = fileBttn;
            }}
          />
        </div>
        <div className="col pull-right">
          <a className="btn btn-primary email lightbox-opener" onClick={this.toggleTextEmailBlastModal}><i className="icomoon-icon_chat_alt"></i> TEXT / EMAIL BLAST</a>
        </div>
        <TextEmailBlastModal show={this.state.showTextEmailBlastModal} onHide={this.toggleTextEmailBlastModal} toggleTextBlast={this.toggleTextBlastModal} />
        <AlertModal show={this.state.showAlertModal} onHide={this.toggleAlertModal} />
        <TextBlastModal
          show={this.state.showTextBlastModal}
          onClose={this.closeTextBlastModal}
          onHide={this.toggleTextBlastModal}
        />
      </div>
    );
  }
}

const formName = 'PatientDatabase.TextBlastModal';
const mapStateToProps = createStructuredSelector({
  formValues: selectValues(formName),
});

function mapDispatchToProps(dispatch) {
  return {
    importPatients: payload => dispatch(importPatients(payload)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientActionButtons);
