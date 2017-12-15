/*
 *
 * ProfilePage reducer
 *
 */

import {
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_ERROR,
  FETCH_OTHER_USER_SUCCESS,
  FETCH_OTHER_USER_ERROR,
} from 'containers/ProfilePage/constants';

const initialState = {
  changePasswordResult: {
    success: '',
    info: '',
    passwordChanging: false,
  },
  otherUser: {
    error: null,
    info: null,
  },
};

function profilePageReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_PASSWORD:
      return {
        ...state,
        changePasswordResult: {
          success: '',
          info: '',
          passwordChanging: true,
        },
      };
    case CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        changePasswordResult: {
          success: true,
          info: action.payload,
          passwordChanging: false,
        },
      };
    case CHANGE_PASSWORD_ERROR:
      return {
        ...state,
        changePasswordResult: {
          success: false,
          info: action.payload,
          passwordChanging: false,
        },
      };
    case FETCH_OTHER_USER_SUCCESS:
      return {
        ...state,
        otherUser: {
          info: action.payload,
          error: null,
        },
      };
    case FETCH_OTHER_USER_ERROR:
      return {
        ...state,
        otherUser: {
          error: action.payload,
        },
      };
    default:
      return state;
  }
}

export default profilePageReducer;
