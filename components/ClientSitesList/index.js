import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Modal } from 'react-bootstrap';
import { map, cloneDeep } from 'lodash';

import EditSiteForm from 'components/EditSiteForm';
import EditUserForm from 'components/EditUserForm';
import { selectCurrentUserClientId, selectClientSites, selectSelectedSite,
  selectSelectedSiteDetailsForForm, selectSelectedUser, selectSelectedUserDetailsForForm,
  selectDeletedUser, selectSavedSite, selectSavedUser } from 'containers/App/selectors';
import { clearSelectedSite, clearSelectedUser,
  deleteUser, saveSite, saveUser } from 'containers/App/actions';
import ClientSiteItem from './ClientSiteItem';
import './styles.less';

class ClientSitesList extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    currentUserClientId: PropTypes.number,
    clientSites: PropTypes.object,
    selectedSite: PropTypes.object,
    selectedSiteDetailsForForm: PropTypes.object,
    selectedUser: PropTypes.object,
    selectedUserDetailsForForm: PropTypes.object,
    deletedUser: PropTypes.object,
    savedSite: PropTypes.object,
    savedUser: PropTypes.object,
    clearSelectedSite: PropTypes.func,
    clearSelectedUser: PropTypes.func,
    deleteUser: PropTypes.func,
    saveSite: PropTypes.func,
    saveUser: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.closeEditSiteModal = this.closeEditSiteModal.bind(this);
    this.closeEditUserModal = this.closeEditUserModal.bind(this);
    this.updateSite = this.updateSite.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);

    this.state = {
      sortBy: null,
      sortOrder: null,
    };
  }

  getColumnSortClassName(columnName) {
    if (this.state.sortBy === columnName) {
      if (this.state.sortOrder === 'asc') {
        return 'up';
      }

      return 'down';
    }

    return null;
  }

  getListItemSortByValue(item) {
    const sortBy = this.state.sortBy;
    if (sortBy === 'name') {
      return item.name;
    } else if (sortBy === 'principalInvestigator') {
      return item.piFirstName;
    } else if (sortBy === 'phone') {
      return item.phone;
    } else if (sortBy === 'address') {
      return item.address;
    }

    return null;
  }

  getSortedClientSites() {
    const { clientSites } = this.props;
    const listItems = cloneDeep(clientSites.details);

    if (!this.state.sortBy) {
      return listItems;
    }

    const sortOrder = this.state.sortOrder;
    const sortedListItems = listItems.sort((a, b) => {
      if (this.getListItemSortByValue(a) < this.getListItemSortByValue(b)) {
        return (sortOrder === 'asc') ? -1 : 1;
      } else if (this.getListItemSortByValue(a) > this.getListItemSortByValue(b)) {
        return (sortOrder === 'asc') ? 1 : -1;
      }

      return 0;
    });

    return sortedListItems;
  }

  clickSortHandler(columnName) {
    if (this.state.sortBy !== columnName) {
      this.setState({
        sortBy: columnName,
        sortOrder: 'asc',
      });
    } else if (this.state.sortOrder === 'asc') {
      this.setState({
        sortOrder: 'des',
      });
    } else if (this.state.sortOrder === 'des') {
      this.setState({
        sortBy: null,
        sortOrder: null,
      });
    }
  }

  editSiteModalShouldBeShown() {
    const { selectedSite } = this.props;
    const displayed = (selectedSite.details) ? true: false; // eslint-disable-line

    return displayed;
  }

  editUserModalShouldBeShown() {
    const { selectedUser } = this.props;
    const displayed = (selectedUser.details && !selectedUser.details.roleForClient) ? true : false; // eslint-disable-line

    return displayed;
  }

  closeEditSiteModal() {
    this.props.clearSelectedSite();
  }

  closeEditUserModal() {
    this.props.clearSelectedUser();
  }

  updateSite(siteData) {
    const { currentUserClientId, selectedSite } = this.props;

    this.props.saveSite(currentUserClientId, selectedSite.details.id, siteData);
  }

  updateUser(userData) {
    const { currentUserClientId, selectedUser } = this.props;
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

    this.props.saveUser(currentUserClientId, selectedUser.details.id, userInput);
  }

  deleteUser() {
    const { selectedUser } = this.props;

    this.props.deleteUser(selectedUser.details.id);
  }

  render() {
    const { selectedSiteDetailsForForm, selectedUserDetailsForForm, deletedUser } = this.props;
    const sortedClientSites = this.getSortedClientSites();
    const clientSitesListContents = sortedClientSites.map((item, index) => (
      <ClientSiteItem {...item} key={index} />
    ));
    const siteOptions = map(sortedClientSites, siteIterator => ({ label: siteIterator.name, value: siteIterator.id.toString() }));
    siteOptions.unshift({ label: 'All', value: '0' });

    const editSiteModalShown = this.editSiteModalShouldBeShown();
    const editUserModalShown = this.editUserModalShouldBeShown();

    if (sortedClientSites.length > 0) {
      return (
        <div className="client-sites">
          <div className="row">
            <div className="col-sm-12">
              <div className="table-responsive">
                <table className="table">
                  <caption>SITE LOCATIONS</caption>
                  <thead>
                    <tr>
                      <th className={this.getColumnSortClassName('name')} onClick={() => { this.clickSortHandler('name'); }}>
                        <span>SITE NAME</span>
                        <i className="caret-arrow"></i>
                      </th>
                      <th className={this.getColumnSortClassName('principalInvestigator')} onClick={() => { this.clickSortHandler('principalInvestigator'); }}>
                        <span>PRINCIPAL INVESTIGATOR</span>
                        <i className="caret-arrow"></i>
                      </th>
                      <th className={this.getColumnSortClassName('phone')} onClick={() => { this.clickSortHandler('phone'); }}>
                        <span>SITE PHONE</span>
                        <i className="caret-arrow"></i>
                      </th>
                      <th className={this.getColumnSortClassName('address')} onClick={() => { this.clickSortHandler('address'); }}>
                        <span>SITE ADDRESS</span>
                        <i className="caret-arrow"></i>
                      </th>
                      <th></th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {clientSitesListContents}
                  </tbody>
                </table>
              </div>
              <Modal className="edit-site" id="edit-site" show={editSiteModalShown} onHide={this.closeEditSiteModal}>
                <Modal.Header closeButton>
                  <Modal.Title>Edit Site</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div className="holder clearfix">
                    <div className="form-lightbox">
                      <EditSiteForm
                        initialValues={selectedSiteDetailsForForm}
                        onSubmit={this.updateSite}
                      />
                    </div>
                  </div>
                </Modal.Body>
              </Modal>
              <Modal className="edit-user" id="edit-user" show={editUserModalShown} onHide={this.closeEditUserModal}>
                <Modal.Header closeButton>
                  <Modal.Title>Edit User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div className="holder clearfix">
                    <div className="form-lightbox">
                      <EditUserForm
                        initialValues={selectedUserDetailsForForm}
                        siteOptions={siteOptions}
                        deleting={deletedUser.deleting}
                        onDelete={this.deleteUser}
                        onSubmit={this.updateUser}
                      />
                    </div>
                  </div>
                </Modal.Body>
              </Modal>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div>
        <h3>No matching sites found!</h3>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUserClientId: selectCurrentUserClientId(),
  clientSites: selectClientSites(),
  selectedSite: selectSelectedSite(),
  selectedSiteDetailsForForm: selectSelectedSiteDetailsForForm(),
  selectedUser: selectSelectedUser(),
  selectedUserDetailsForForm: selectSelectedUserDetailsForForm(),
  deletedUser: selectDeletedUser(),
  savedSite: selectSavedSite(),
  savedUser: selectSavedUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    clearSelectedSite: () => dispatch(clearSelectedSite()),
    clearSelectedUser: () => dispatch(clearSelectedUser()),
    deleteUser: (id) => dispatch(deleteUser(id)),
    saveSite: (clientId, id, data) => dispatch(saveSite(clientId, id, data)),
    saveUser: (clientId, id, data) => dispatch(saveUser(clientId, id, data)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientSitesList);
