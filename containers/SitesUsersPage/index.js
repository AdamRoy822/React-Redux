import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Helmet from 'react-helmet';
import { Modal } from 'react-bootstrap';
import { map } from 'lodash';

import EditSiteForm from 'components/EditSiteForm';
import EditUserForm from 'components/EditUserForm';
import ClientSitesList from 'components/ClientSitesList';
import ClientRolesList from 'components/ClientRolesList';
import { selectCurrentUserClientId, selectClientSites,
  selectClientRoles, selectSavedSite, selectSavedUser } from 'containers/App/selectors';
import { fetchClientSites, fetchClientRoles, saveSite, saveUser } from 'containers/App/actions';
import './styles.less';

export class SitesUsersPage extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    currentUserClientId: PropTypes.number,
    clientSites: PropTypes.object,
    clientRoles: PropTypes.object,
    savedSite: PropTypes.object,
    savedUser: PropTypes.object,
    fetchClientSites: PropTypes.func,
    fetchClientRoles: PropTypes.func,
    saveSite: PropTypes.func,
    saveUser: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      addSiteModalOpen: false,
      addUserModalOpen: false,
    };

    this.openAddSiteModal = this.openAddSiteModal.bind(this);
    this.closeAddSiteModal = this.closeAddSiteModal.bind(this);
    this.openAddUserModal = this.openAddUserModal.bind(this);
    this.closeAddUserModal = this.closeAddUserModal.bind(this);
    this.searchClientRoles = this.searchClientRoles.bind(this);
    this.searchClientSites = this.searchClientSites.bind(this);
    this.addSite = this.addSite.bind(this);
    this.addUser = this.addUser.bind(this);
  }

  componentWillMount() {
    const { currentUserClientId } = this.props;
    if (currentUserClientId) {
      this.props.fetchClientSites(currentUserClientId, {});
      this.props.fetchClientRoles(currentUserClientId, {});
    }
  }

  componentWillReceiveProps(newProps) {
    if (!newProps.savedSite.saving && this.props.savedSite.saving) {
      this.closeAddSiteModal();
    }
    if (!newProps.savedUser.saving && this.props.savedUser.saving) {
      this.closeAddUserModal();
    }
  }

  openAddSiteModal() {
    this.setState({ addSiteModalOpen: true });
  }

  closeAddSiteModal() {
    this.setState({ addSiteModalOpen: false });
  }

  openAddUserModal() {
    this.setState({ addUserModalOpen: true });
  }

  closeAddUserModal() {
    this.setState({ addUserModalOpen: false });
  }

  searchClientSites(event) {
    if (event.key === 'Enter') {
      const { currentUserClientId } = this.props;
      const searchFilter = { name: event.target.value };
      this.props.fetchClientSites(currentUserClientId, searchFilter);
    }
  }

  searchClientRoles(event) {
    if (event.key === 'Enter') {
      const { currentUserClientId } = this.props;
      const searchFilter = { name: event.target.value };
      this.props.fetchClientRoles(currentUserClientId, searchFilter);
    }
  }

  addSite(siteData) {
    const { currentUserClientId } = this.props;

    this.props.saveSite(currentUserClientId, null, siteData);
  }

  addUser(userData) {
    const { currentUserClientId } = this.props;
    const userInput = {
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      siteId: parseInt(userData.site, 10),
    };
    if (userData.site === '0') {
      userInput.clientRole = {
        purchase: userData.purchase || false,
        reward: userData.reward || false,
      };
    }

    this.props.saveUser(currentUserClientId, null, userInput);
  }

  render() {
    const { currentUserClientId, clientSites } = this.props;
    if (!currentUserClientId) {
      return (
        <div className="sites-users-page">
          <div className="container-fluid">
            <Helmet title="Manage Sites/Users" />
            <section className="no-items">
              <h4>You don't have permission to manage sites and users</h4>
            </section>
          </div>
        </div>
      );
    }

    const siteOptions = map(clientSites.details, siteIterator => ({ label: siteIterator.name, value: siteIterator.id.toString() }));
    siteOptions.unshift({ label: 'All', value: '0' });

    return (
      <div className="sites-users-page">
        <div className="container-fluid">
          <Helmet title="Manage Sites / Users - StudyKIK" />
          <h2 className="main-heading">MANAGE SITES / USERS</h2>
          <div className="search-sites-users-panel form-group">
            <form className="form-search clearfix">
              <div className="fields-holder pull-left">
                <div className="search-area pull-left">
                  <div className="field">
                    <input type="text" className="form-control keyword-search" placeholder="Search Site Name..." onKeyPress={this.searchClientSites} />
                    <label htmlFor="search">
                      <i className="icomoon-icon_search2" />
                    </label>
                  </div>
                </div>
                <div className="search-area pull-left">
                  <div className="field">
                    <input type="text" className="form-control keyword-search" placeholder="Search User Name..." onKeyPress={this.searchClientRoles} />
                    <label htmlFor="search">
                      <i className="icomoon-icon_search2" />
                    </label>
                  </div>
                </div>
              </div>
              <section className="btns-area pull-right">
                <div className="col pull-right">
                  <button type="button" className="btn btn-primary" onClick={this.openAddUserModal}>
                    + Add User
                  </button>
                  <Modal className="new-user" id="new-user" show={this.state.addUserModalOpen} onHide={this.closeAddUserModal}>
                    <Modal.Header closeButton>
                      <Modal.Title>New User</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <div className="holder clearfix">
                        <div className="form-lightbox">
                          <EditUserForm siteOptions={siteOptions} onSubmit={this.addUser} />
                        </div>
                      </div>
                    </Modal.Body>
                  </Modal>
                </div>
                <div className="col pull-right">
                  <button type="button" className="btn btn-primary" onClick={this.openAddSiteModal}>
                    + Add Site Location
                  </button>
                  <Modal className="new-site" id="new-site" show={this.state.addSiteModalOpen} onHide={this.closeAddSiteModal}>
                    <Modal.Header closeButton>
                      <Modal.Title>New Site</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <div className="holder clearfix">
                        <div className="form-lightbox">
                          <EditSiteForm onSubmit={this.addSite} />
                        </div>
                      </div>
                    </Modal.Body>
                  </Modal>
                </div>
              </section>
            </form>
          </div>
          <section className="table-holder form-group client-roles-holder">
            <ClientRolesList />
          </section>
          <section className="table-holder form-group client-sites-holder">
            <ClientSitesList />
          </section>
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUserClientId: selectCurrentUserClientId(),
  clientSites: selectClientSites(),
  clientRoles: selectClientRoles(),
  savedSite: selectSavedSite(),
  savedUser: selectSavedUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchClientSites: (clientId, searchParams) => dispatch(fetchClientSites(clientId, searchParams)),
    fetchClientRoles: (clientId, searchParams) => dispatch(fetchClientRoles(clientId, searchParams)),
    saveSite: (clientId, id, data) => dispatch(saveSite(clientId, id, data)),
    saveUser: (clientId, id, data) => dispatch(saveUser(clientId, id, data)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SitesUsersPage);
