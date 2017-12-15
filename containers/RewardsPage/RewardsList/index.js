import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import RewardListItem from './RewardListItem';
import './styles.less';

class RewardsList extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    rewards: PropTypes.array,
  };

  render() {
    const { rewards } = this.props;
    const RewardsListContents = rewards.map((item, index) => (
      <RewardListItem
        {...item}
        key={index}
        index={index}
      />
    ));

    if (rewards.length > 0) {
      return (
        <div>
          <header>
            <h2>REWARDS HISTORY</h2>
          </header>
          <table className="table">
            <colgroup>
              <col style={{ width: '48%' }} />
              <col style={{ width: '13.2%' }} />
              <col style={{ width: '14.5%' }} />
              <col style={{ width: '14.2%' }} />
              <col style={{ width: 'auto' }} />
            </colgroup>
            <thead>
              <tr>
                <th>DESCRIPTION <i className="caret-arrow"></i></th>
                <th>DATE <i className="caret-arrow"></i></th>
                <th>TIME <i className="caret-arrow"></i></th>
                <th>AMOUNT <i className="caret-arrow"></i></th>
                <th>BALANCE <i className="caret-arrow"></i></th>
              </tr>
            </thead>
            <tbody>
              {RewardsListContents}
            </tbody>
          </table>
        </div>
      );
    }
    return (
      <div>
        <h3>No rewards found!</h3>
      </div>
    );
  }
}

export default connect(null, null)(RewardsList);
