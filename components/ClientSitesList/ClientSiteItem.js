import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectSelectedSite, selectSelectedUser } from 'containers/App/selectors';
import { fetchSite, fetchUser } from 'containers/App/actions';
import LoadingSpinner from 'components/LoadingSpinner';

class ClientSiteItem extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    id: PropTypes.number,
    name: PropTypes.string,
    piFirstName: PropTypes.string,
    piLastName: PropTypes.string,
    phone: PropTypes.string,
    address: PropTypes.string,
    users: PropTypes.array,
    selectedSite: PropTypes.object,
    selectedUser: PropTypes.object,
    fetchSite: PropTypes.func,
    fetchUser: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      assignedUsersCollapsed: true,
    };

    this.toggleAssignedUsers = this.toggleAssignedUsers.bind(this);
    this.editSite = this.editSite.bind(this);
  }

  toggleAssignedUsers() {
    const collapsed = !this.state.assignedUsersCollapsed;
    this.setState({ assignedUsersCollapsed: collapsed });
  }

  editSite() {
    this.props.fetchSite(this.props.id);
  }

  editAssignedUser(assignedUser) {
    this.props.fetchUser(assignedUser.id);
  }

  currentSiteIsBeingFetched() {
    const { selectedSite, id } = this.props;

    return (selectedSite.fetching && selectedSite.id === id);
  }

  assignedUserIsBeingFetched(assignedUser) {
    const { selectedUser } = this.props;

    return (selectedUser.fetching && selectedUser.id === assignedUser.id);
  }

  render() {
    const { name, piFirstName, piLastName, phone, address, users } = this.props;
    const assignedUsersContent = users.map((item, index) => (
      <div className="assigned-user" key={index}>
        <span>{item.firstName} {item.lastName}</span>
        <span className="edit-assigned-user">
          {(this.assignedUserIsBeingFetched(item))
            ? <span><LoadingSpinner showOnlyIcon size={20} className="fetching-assigned-user" /></span>
            : <a href="#" className="btn edit-icon" onClick={() => { this.editAssignedUser(item); }}><i className="pencil-square" /></a>
          }
        </span>
      </div>
    ));

    return (
      <tr className="client-site-container">
        <td className="name">
          <span>{name}</span>
        </td>
        <td className="principal-investigator">
          <span>{piFirstName} {piLastName}</span>
        </td>
        <td className="phone">
          <span>{phone}</span>
        </td>
        <td className="address">
          <span>{address}</span>
        </td>
        <td className="assigned-users">
          <div className="toggle-assigned-users">
            <span>ASSIGNED USERS</span>
            {this.state.assignedUsersCollapsed
              ? <a href="#" className="btn toggle toggle-plus" onClick={this.toggleAssignedUsers}></a>
              : <a href="#" className="btn toggle toggle-minus" onClick={this.toggleAssignedUsers}></a>
            }
          </div>
          {!this.state.assignedUsersCollapsed &&
            <div className="assigned-users-list">{assignedUsersContent}</div>
          }
        </td>
        <td className="action">
          <button type="button" className="btn btn-primary btn-edit-site pull-right" onClick={this.editSite} disabled={(this.currentSiteIsBeingFetched())}>
            {(this.currentSiteIsBeingFetched())
              ? <span><LoadingSpinner showOnlyIcon size={20} className="fetching-site" /></span>
              : <span>Edit</span>
            }
          </button>
        </td>
      </tr>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  selectedSite: selectSelectedSite(),
  selectedUser: selectSelectedUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchSite: (id) => dispatch(fetchSite(id)),
    fetchUser: (id) => dispatch(fetchUser(id)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientSiteItem);
