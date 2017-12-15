import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

import defaultImage from 'assets/images/Default-User-Img-Dr.png';

class RewardListItem extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    id: PropTypes.number,
    points: PropTypes.number,
    balance: PropTypes.number,
    site_id: PropTypes.number,
    userName: PropTypes.string,
    userImageURL: PropTypes.string,
    description: PropTypes.string,
    date: PropTypes.string,
    time: PropTypes.string,
  };

  render() {
    const { balance, points, userName, userImageURL, description, date, time } = this.props;
    let content = null;
    content = (
      <tr>
        <td>
          <div className="info clearfix">
            <div className="img-holder">
              <img src={userImageURL || defaultImage} alt="" />
            </div>
            <div className="desc">
              <p><strong>{ userName }</strong> { description }</p>
            </div>
          </div>
        </td>
        <td>{ date }</td>
        <td>{ time } </td>
        <td>{ points }</td>
        <td>{ balance }</td>
      </tr>
    );
    return content;
  }
}

export default connect(null, null)(RewardListItem);
