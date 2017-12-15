import { map, cloneDeep, findIndex } from 'lodash';

import {
  FETCH_PATIENTS,
  FETCH_PATIENTS_SUCCESS,
  FETCH_PATIENTS_ERROR,

  FETCH_PATIENT_CATEGORIES,
  FETCH_PATIENT_CATEGORIES_SUCCESS,
  FETCH_PATIENT_CATEGORIES_ERROR,

  FETCH_PATIENT,
  FETCH_PATIENT_SUCCESS,
  FETCH_PATIENT_ERROR,

  CLEAR_SELECTED_PATIENT,

  SAVE_PATIENT,
  SAVE_PATIENT_SUCCESS,
  SAVE_PATIENT_ERROR,

  INIT_CHAT,
  DISABLE_CHAT,
  SET_ACTIVE_SORT,
  SORT_PATIENTS_SUCCESS,
  DOWNLOAD_COMPLETE,
} from './constants';

const initialState = {
  patients: {
    details: [],
    fetching: false,
    error: null,
  },
  patientCategories: {
    details: [],
    fetching: false,
    error: null,
  },
  selectedPatient: {
    details: null,
    fetching: false,
    error: null,
  },
  savedPatient: {
    details: null,
    saving: false,
    error: null,
  },
  chat: {
    details: null,
    active: false,
    error: null,
  },
  paginationOptions: {
    hasMoreItems: true,
    page: 1,
    activeSort: null,
    activeDirection: null,
    prevSearchFilter: {},
  },
};

export default function patientDatabasePageReducer(state = initialState, action) {
  const { payload } = action;
  const patientsCollection = map(state.patients.details, cloneDeep);
  let foundIndex = -1;

  switch (action.type) {
    case DOWNLOAD_COMPLETE:
      return {
        ...state,
        patients: {
          details: state.patients.details,
          fetching: false,
          error: null,
        },
      };
    case FETCH_PATIENTS:
      return {
        ...state,
        patients: {
          details: state.patients.details,
          fetching: true,
          error: null,
        },
        paginationOptions: {
          hasMoreItems: false,
          page: state.paginationOptions.page,
          activeSort: state.paginationOptions.activeSort,
          activeDirection: state.paginationOptions.activeDirection,
          prevSearchFilter: state.paginationOptions.prevSearchFilter,
        },
      };
    case FETCH_PATIENTS_SUCCESS:
      return {
        ...state,
        patients: {
          details: payload,
          fetching: false,
          error: null,
        },
        paginationOptions: {
          hasMoreItems: action.hasMore,
          page: action.page,
          activeSort: state.paginationOptions.activeSort,
          activeDirection: state.paginationOptions.activeDirection,
          prevSearchFilter: action.searchFilter,
        },
      };
    case FETCH_PATIENTS_ERROR:
      return {
        ...state,
        patients: {
          details: [],
          fetching: false,
          error: payload,
        },
      };
    case FETCH_PATIENT_CATEGORIES:
      return {
        ...state,
        patientCategories: {
          details: [],
          fetching: true,
          error: null,
        },
      };
    case FETCH_PATIENT_CATEGORIES_SUCCESS:
      return {
        ...state,
        patientCategories: {
          details: payload,
          fetching: false,
          error: null,
        },
      };
    case FETCH_PATIENT_CATEGORIES_ERROR:
      return {
        ...state,
        patientCategories: {
          details: [],
          fetching: false,
          error: payload,
        },
      };
    case FETCH_PATIENT:
      return {
        ...state,
        selectedPatient: {
          details: null,
          id: action.id,
          fetching: true,
          error: null,
        },
      };
    case FETCH_PATIENT_SUCCESS:
      return {
        ...state,
        selectedPatient: {
          details: payload,
          fetching: false,
          error: null,
        },
      };
    case FETCH_PATIENT_ERROR:
      return {
        ...state,
        selectedPatient: {
          details: null,
          fetching: false,
          error: payload,
        },
      };
    case CLEAR_SELECTED_PATIENT:
      return {
        ...state,
        selectedPatient: {
          details: null,
          fetching: false,
          error: null,
        },
      };
    case SAVE_PATIENT:
      return {
        ...state,
        savedPatient: {
          details: null,
          saving: true,
          error: null,
        },
      };
    case SAVE_PATIENT_SUCCESS:
      foundIndex = findIndex(patientsCollection, { id: payload.id });
      if (foundIndex > -1) {
        patientsCollection[foundIndex] = payload;
      }

      return {
        ...state,
        savedPatient: {
          details: payload,
          saving: false,
          error: null,
        },
        patients: {
          details: patientsCollection,
          fetching: false,
          error: null,
        },
        selectedPatient: {
          details: null,
          fetching: false,
          error: null,
        },
      };
    case SAVE_PATIENT_ERROR:
      return {
        ...state,
        savedPatient: {
          details: null,
          saving: false,
          error: payload,
        },
        selectedPatient: {
          details: null,
          fetching: false,
          error: null,
        },
      };
    case INIT_CHAT:
      return {
        ...state,
        chat: {
          details: payload,
          active: true,
          error: null,
        },
      };
    case DISABLE_CHAT:
      return {
        ...state,
        chat: {
          details: null,
          active: false,
          error: null,
        },
      };
    case SET_ACTIVE_SORT:
      return {
        ...state,
        paginationOptions: {
          hasMoreItems: state.paginationOptions.hasMoreItems,
          page: state.paginationOptions.page,
          activeSort: action.sort,
          activeDirection: action.direction,
          prevSearchFilter: state.paginationOptions.prevSearchFilter,
        },
      };
    case SORT_PATIENTS_SUCCESS:
      return {
        ...state,
        patients: {
          details: action.patients,
          fetching: false,
          error: null,
        },
      };
    default:
      return state;
  }
}
