import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Modal } from 'react-bootstrap';
import { map, cloneDeep } from 'lodash';

import EditUserForm from 'components/EditUserForm';
import { selectCurrentUserClientId, selectClientSites, selectClientRoles, selectSelectedUser,
  selectDeletedClientRole, selectSavedUser, selectSelectedUserDetailsForForm } from 'containers/App/selectors';
import { clearSelectedUser, deleteClientRole, saveUser } from 'containers/App/actions';
import ClientRoleItem from './ClientRoleItem';
import './styles.less';

class ClientRolesList extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    currentUserClientId: PropTypes.number,
    clientSites: PropTypes.object,
    clientRoles: PropTypes.object,
    selectedUser: PropTypes.object,
    selectedUserDetailsForForm: PropTypes.object,
    deletedClientRole: PropTypes.object,
    savedUser: PropTypes.object,
    clearSelectedUser: PropTypes.func,
    deleteClientRole: PropTypes.func,
    saveUser: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.closeEditUserModal = this.closeEditUserModal.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.deleteClientRole = this.deleteClientRole.bind(this);

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
      return item.user.firstName;
    } else if (sortBy === 'email') {
      return item.user.email;
    } else if (sortBy === 'access') {
      const { name, reward, purchase } = item;
      let accessStr = '';
      const isSuperAdmin = (name === 'Super Admin');

      if (isSuperAdmin) {
        accessStr = 'ADMIN';
      } else if (purchase && reward) {
        accessStr = 'ALL ACCESS';
      } else if (purchase && !reward) {
        accessStr = 'PURCHASE';
      } else if (!purchase && reward) {
        accessStr = 'REWARDS';
      } else {
        accessStr = 'NO ACCESS';
      }

      return accessStr;
    }

    return null;
  }

  getSortedClientRoles() {
    const { clientRoles } = this.props;
    const listItems = cloneDeep(clientRoles.details);

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

  editUserModalShouldBeShown() {
    const { selectedUser } = this.props;
    const displayed = (selectedUser.details && selectedUser.details.roleForClient) ? true: false; // eslint-disable-line

    return displayed;
  }

  closeEditUserModal() {
    this.props.clearSelectedUser();
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

  deleteClientRole() {
    const { selectedUser } = this.props;

    this.props.deleteClientRole(selectedUser.details.roleForClient.id);
  }

  render() {
    const { clientSites, selectedUserDetailsForForm, deletedClientRole } = this.props;
    const sortedClientRoles = this.getSortedClientRoles();
    const clientRolesListContents = sortedClientRoles.map((item, index) => (
      <ClientRoleItem {...item} key={index} />
    ));
    const siteOptions = map(clientSites.details, siteIterator => ({ label: siteIterator.name, value: siteIterator.id.toString() }));
    siteOptions.unshift({ label: 'All', value: '0' });

    const editUserModalShown = this.editUserModalShouldBeShown();

    if (sortedClientRoles.length > 0) {
      return (
        <div className="client-roles">
          <div className="row">
            <div className="col-sm-12">
              <div className="table-responsive">
                <table className="table">
                  <caption>ADMINS</caption>
                  <thead>
                    <tr>
                      <th className={this.getColumnSortClassName('name')} onClick={() => { this.clickSortHandler('name'); }}>
                        <span>NAME</span>
                        <i className="caret-arrow"></i>
                      </th>
                      <th className={this.getColumnSortClassName('email')} onClick={() => { this.clickSortHandler('email'); }}>
                        <span>EMAIL</span>
                        <i className="caret-arrow"></i>
                      </th>
                      <th className={this.getColumnSortClassName('access')} onClick={() => { this.clickSortHandler('access'); }}>
                        <span>ACCESS</span>
                        <i className="caret-arrow"></i>
                      </th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {clientRolesListContents}
                  </tbody>
                </table>
              </div>
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
                        deleting={deletedClientRole.deleting}
                        onDelete={this.deleteClientRole}
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
        <h3>No matching admins found!</h3>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUserClientId: selectCurrentUserClientId(),
  clientSites: selectClientSites(),
  clientRoles: selectClientRoles(),
  selectedUser: selectSelectedUser(),
  selectedUserDetailsForForm: selectSelectedUserDetailsForForm(),
  deletedClientRole: selectDeletedClientRole(),
  savedUser: selectSavedUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    clearSelectedUser: () => dispatch(clearSelectedUser()),
    deleteClientRole: (id) => dispatch(deleteClientRole(id)),
    saveUser: (clientId, id, data) => dispatch(saveUser(clientId, id, data)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientRolesList);
