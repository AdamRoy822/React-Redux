/*
 *
 * Patient Database page actions
 *
 */

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

  ADD_PATIENTS_TO_TEXT_BLAST,
  REMOVE_PATIENT_FROM_TEXT_BLAST,
  REMOVE_PATIENTS_FROM_TEXT_BLAST,
  SUBMIT_TEXT_BLAST,
  SET_ACTIVE_SORT,
  SORT_PATIENTS_SUCCESS,
  DOWNLOAD_COMPLETE,
  IMPORT_PATIENTS,
} from './constants';
import _ from 'lodash';

export function fetchPatients(searchParams = {}, patients = {}, searchFilter = {}, isExport = false) {
  return {
    type: FETCH_PATIENTS,
    searchParams,
    patients,
    searchFilter,
    isExport,
  };
}

export function patientsFetched(searchParams, payload, patients, searchFilter) {
  const result = payload;
  const initResult = payload;
  /* if (searchParams.includeIndication) {
    const includeIndications = searchParams.includeIndication.split(',');
    result = filter(result, patientIterator => {
      const foundIndications = filter(includeIndications, includeIterator => {
        const foundIndex = findIndex(patientIterator.indications, { id: parseInt(includeIterator, 10) });
        return (foundIndex > -1);
      });
      return foundIndications.length;
    });
  }

  if (searchParams.excludeIndication) {
    const excludeIndications = searchParams.excludeIndication.split(',');
    result = filter(result, patientIterator => {
      const foundIndications = filter(excludeIndications, excludeIterator => {
        const foundIndex = findIndex(patientIterator.indications, { id: parseInt(excludeIterator, 10) });
        return (foundIndex > -1);
      });
      return !foundIndications.length;
    });
  }*/

  /* if (searchParams.status) {
    result = filter(result, patientIterator => (patientIterator.studyPatientCategory.patient_category_id === searchParams.status));
  }*/

  let resultArr = [];
  if (searchParams.skip === 0) {
    _.forEach(result, (item, index) => {
      result[index].orderNumber = index + 1;
    });
    resultArr = result;
  } else {
    const patientsCount = patients.length;
    _.forEach(result, (item, index) => {
      result[index].orderNumber = patientsCount + index + 1;
    });
    resultArr = patients.concat(result);
  }

  if (searchParams.sort && searchParams.sort === 'orderNumber') {
    const dir = ((searchParams.direction === 'down') ? 'desc' : 'asc');
    resultArr = _.orderBy(resultArr, [function (o) {
      return o.orderNumber;
    }], [dir]);
  }

  let hasMore = true;
  let page = (searchParams.skip / 15) + 1;
  if (initResult.length < searchParams.limit) {
    hasMore = false;
    page = 1;
  }

  return {
    type: FETCH_PATIENTS_SUCCESS,
    payload: resultArr,
    hasMore,
    page,
    searchFilter,
    searchParams,
    result,
  };
}

export function patientsFetchingError(payload) {
  return {
    type: FETCH_PATIENTS_ERROR,
    payload,
  };
}

export function fetchPatientCategories(searchParams) {
  return {
    type: FETCH_PATIENT_CATEGORIES,
    searchParams,
  };
}

export function patientCategoriesFetched(payload) {
  return {
    type: FETCH_PATIENT_CATEGORIES_SUCCESS,
    payload,
  };
}

export function patientCategoriesFetchingError(payload) {
  return {
    type: FETCH_PATIENT_CATEGORIES_ERROR,
    payload,
  };
}

export function fetchPatient(id) {
  return {
    type: FETCH_PATIENT,
    id,
  };
}

export function patientFetched(payload) {
  return {
    type: FETCH_PATIENT_SUCCESS,
    payload,
  };
}

export function patientFetchingError(payload) {
  return {
    type: FETCH_PATIENT_ERROR,
    payload,
  };
}

export function clearSelectedPatient() {
  return {
    type: CLEAR_SELECTED_PATIENT,
  };
}

export function savePatient(id, data) {
  return {
    type: SAVE_PATIENT,
    id,
    data,
  };
}

export function patientSaved(payload) {
  return {
    type: SAVE_PATIENT_SUCCESS,
    payload,
  };
}

export function patientSavingError(payload) {
  return {
    type: SAVE_PATIENT_ERROR,
    payload,
  };
}

export function initChat(payload) {
  return {
    type: INIT_CHAT,
    payload,
  };
}

export function disableChat() {
  return {
    type: DISABLE_CHAT,
  };
}

export function addPatientsToTextBlast(patients) {
  return {
    type: ADD_PATIENTS_TO_TEXT_BLAST,
    patients,
  };
}

export function removePatientFromTextBlast(patient) {
  return {
    type: REMOVE_PATIENT_FROM_TEXT_BLAST,
    patient,
  };
}

export function removePatientsFromTextBlast(patients) {
  return {
    type: REMOVE_PATIENTS_FROM_TEXT_BLAST,
    patients,
  };
}

export function submitTextBlast(patients, message, onClose) {
  return {
    type: SUBMIT_TEXT_BLAST,
    patients,
    message,
    onClose,
  };
}

export function setActiveSort(sort, direction) {
  return {
    type: SET_ACTIVE_SORT,
    sort,
    direction,
  };
}

export function sortPatientsSuccess(patients) {
  return {
    type: SORT_PATIENTS_SUCCESS,
    patients,
  };
}

export function importPatients(payload) {
  return {
    type: IMPORT_PATIENTS,
    payload,
  };
}

export function downloadComplete() {
  return {
    type: DOWNLOAD_COMPLETE,
  };
}
