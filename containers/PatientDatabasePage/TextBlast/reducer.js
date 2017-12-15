/**
 * Created by mike on 10/31/16.
 */

import {
  ADD_PATIENTS_TO_TEXT_BLAST,
  REMOVE_PATIENT_FROM_TEXT_BLAST,
  REMOVE_PATIENTS_FROM_TEXT_BLAST,
  FETCH_PATIENTS_SUCCESS,
} from '../constants';
import _ from 'lodash';
const initialState = {
  values: {
    uncheckedPatients: [],
  },
};
export default function TextBlastModal(state = initialState, action) {
  let patientsIdsToAdd = [];
  let patientsIdsToRemove = [];
  const checkedPatinets = {};
  let patients = {};
  let allPatients = false;
  switch (action.type) {
    case ADD_PATIENTS_TO_TEXT_BLAST:
      patientsIdsToAdd = _.map(action.patients, patient => (patient.id));
      return {
        ...state,
        values: {
          ...state.values,
          patients: _.unionWith(state.values.patients, action.patients, (patient, patientToAdd) => (
            patient.id === patientToAdd.id
          )),
          uncheckedPatients:_.filter(state.values.uncheckedPatients, (id) => {
            if (_.indexOf(patientsIdsToAdd, id) === -1) {
              return true;
            }
            return false;
          }),
        },
      };
    case REMOVE_PATIENT_FROM_TEXT_BLAST:
      return {
        ...state,
        values: {
          ...state.values,
          patients: state.values.patients.filter(patient => (
            patient.id !== action.patient[0].id
          )),
          uncheckedPatients: [...state.values.uncheckedPatients, action.patient[0].id],
          'all-patients': false,
        },
      };
    case REMOVE_PATIENTS_FROM_TEXT_BLAST:
      patientsIdsToRemove = _.map(action.patients, patient => (patient.id));
      return {
        ...state,
        values: {
          ...state.values,
          patients: [],
          uncheckedPatients: patientsIdsToRemove,
          'all-patients': false,
        },
      };
    case FETCH_PATIENTS_SUCCESS:
      patients = _.filter(action.payload, (patients) => {
        if (_.indexOf(state.values.uncheckedPatients, patients.id) === -1) {
          return { id: patients.id };
        }
        return false;
      });
      _.forEach(patients, (patient) => {
        checkedPatinets[`patient-${patient.id}`] = true;
      });

      if (patients.length === action.payload.length) {
        allPatients = true;
      }

      return {
        ...state,
        values: {
          ...state.values,
          patients,
          ...checkedPatinets,
          'all-patients': allPatients,
        },
      };
    default:
      return state;
  }
}
