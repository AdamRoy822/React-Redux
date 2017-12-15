/*
 *
 * GlobalNotifications actions
 *
 */

import {
  SET_SOCKET_CONNECTION,
  DISCONNECT_SOCKET,
  SOCKET_CONNECTION_ESTABLISHED,
  SOCKET_CONNECTION_FAILED,
  SUBSCRIBE_TO_PAGE_EVENT,
  UNSUBSCRIBE_FROM_PAGE_EVENT,
  UNSUBSCRIBE_FROM_ALL,
  SUBSCRIBE_TO_CHAT_EVENT,
  FETCH_NOTIFICATIONS,
  FETCH_NOTIFICATIONS_SUCCESS,
  FETCH_UNREAD_NOTIFICATIONS_COUNT,
  FETCH_UNREAD_NOTIFICATIONS_COUNT_SUCCESS,
  RECEIVE_NOTIFICATION,
  FETCH_STUDY_PATIENT_MESSAGES,
  SEND_STUDY_PATIENT_MESSAGES,
  SET_PROCESSING_STATUS,
} from './constants';

export function subscribeToPageEvent(payload) {
  return {
    type: SUBSCRIBE_TO_PAGE_EVENT,
    payload,
  };
}

export function subscribeToChatEvent(payload) {
  return {
    type: SUBSCRIBE_TO_CHAT_EVENT,
    payload,
  };
}

export function unsubscribeFromPageEvent(payload) {
  return {
    type: UNSUBSCRIBE_FROM_PAGE_EVENT,
    payload,
  };
}

export function unsubscribeFromAll(payload) {
  return {
    type: UNSUBSCRIBE_FROM_ALL,
    payload,
  };
}

export function setSocketConnection(payload) {
  return {
    type: SET_SOCKET_CONNECTION,
    payload,
  };
}

export function fetchStudyPatientMessages(payload) {
  return {
    type: FETCH_STUDY_PATIENT_MESSAGES,
    payload,
  };
}

export function sendStudyPatientMessages(payload, cb) {
  return {
    type: SEND_STUDY_PATIENT_MESSAGES,
    payload,
    cb,
  };
}

export function setProcessingStatus(payload) {
  return {
    type: SET_PROCESSING_STATUS,
    payload,
  };
}

export function connectionEstablished(payload) {
  return {
    type: SOCKET_CONNECTION_ESTABLISHED,
    payload,
  };
}

export function disconnectSocket(payload) {
  return {
    type: DISCONNECT_SOCKET,
    payload,
  };
}

export function connectionError(payload) {
  return {
    type: SOCKET_CONNECTION_FAILED,
    payload,
  };
}

export function fetchNotifications(userId, searchParams) {
  return {
    type: FETCH_NOTIFICATIONS,
    userId,
    searchParams,
  };
}

export function fetchNotificationsSucceeded(payload) {
  return {
    type: FETCH_NOTIFICATIONS_SUCCESS,
    payload,
  };
}

export function fetchUnreadNotificationsCount(userId) {
  return {
    type: FETCH_UNREAD_NOTIFICATIONS_COUNT,
    userId,
  };
}

export function fetchUnreadNotificationsCountSucceeded(payload) {
  return {
    type: FETCH_UNREAD_NOTIFICATIONS_COUNT_SUCCESS,
    payload,
  };
}

export function receiveNotification(payload) {
  return {
    type: RECEIVE_NOTIFICATION,
    payload,
  };
}
