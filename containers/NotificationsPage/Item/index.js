import React, { PropTypes } from 'react';

const NotificationItem = ({ notification, onClick }) => {
  const { event_log, date, time } = notification;

  return (
    <tr className="" onClick={onClick}>
      <td>
        <div className="info clearfix">
          <div className="img-holder">
            <img alt="description" src="images/patient1.jpg" />
          </div>
          <div className="desc">
            <p>
              <span dangerouslySetInnerHTML={{ __html: event_log.eventMessage }} />
            </p>
          </div>
        </div>
      </td>
      <td>{date}</td>
      <td>{time}</td>
    </tr>
  );
};

NotificationItem.propTypes = {
  notification: PropTypes.object,
  onClick: PropTypes.func.isRequired,
};

export default NotificationItem;
