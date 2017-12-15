import { createSelector } from 'reselect';

/**
 * Direct selector to the globalNotifications state domain
 */
const selectGlobalNotificationsDomain = () => state => state.globalNotifications;

/**
 * Other specific selectors
 */


/**
 * Default selector used by GlobalNotifications
 */

const selectGlobalNotifications = () => createSelector(
  selectGlobalNotificationsDomain(),
  (substate) => substate
);

const selectSocket = () => createSelector(
  selectGlobalNotificationsDomain(),

  (substate) => substate.socket
);

const selectUnreadNotificationsCount = createSelector(
  selectGlobalNotificationsDomain(),
  (substate) => substate.unreadNotificationsCount,
);

const selectNotifications = createSelector(
  selectGlobalNotificationsDomain(),
  (substate) => substate.notifications,
);

const selectProcessingStatus = () => createSelector(
  selectGlobalNotificationsDomain(),
  (substate) => substate.processing,
);

export default selectGlobalNotifications;
export {
  selectGlobalNotificationsDomain,
  selectGlobalNotifications,
  selectSocket,
  selectProcessingStatus,
  selectUnreadNotificationsCount,
  selectNotifications,
};
