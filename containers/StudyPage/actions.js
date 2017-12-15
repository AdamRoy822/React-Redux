/*
 *
 * ProfilePage actions
 *
 */

import {
  FIND_PATIENTS_TEXT_BLAST,
  FIND_PATIENTS_TEXT_BLAST_SUCCESS,
  FILTER_PATIENTS_TEXT_BLAST,
  ADD_PATIENTS_TO_TEXT_BLAST,
  REMOVE_PATIENT_FROM_TEXT_BLAST,
  REMOVE_PATIENTS_FROM_TEXT_BLAST,
  FETCH_CAMPAIGNS_SUCCESS,
  FETCH_PATIENTS,
  FETCH_PATIENTS_SUCCESS,
  FETCH_PATIENT_DETAILS,
  FETCH_PATIENT_DETAILS_SUCCESS,
  FETCH_PATIENT_CATEGORIES,
  FETCH_PATIENT_CATEGORIES_SUCCESS,
  FETCH_STUDY,
  FETCH_STUDY_VIEWS_SUCCESS,
  FETCH_STUDY_PATIENT_REFERRALS_SUCCESS,
  FETCH_STUDY_CALLS_SUCCESS,
  FETCH_STUDY_TEXTS_SUCCESS,
  FETCH_SITE_SUCCESS,
  FETCH_SOURCES_SUCCESS,
  FETCH_STUDY_SUCCESS,
  EXPORT_PATIENTS,
  EXPORT_PATIENTS_SUCCESS,
  READ_STUDY_PATIENT_MESSAGES,
  READ_STUDY_PATIENT_MESSAGES_SUCCESS,
  READ_STUDY_PATIENT_MESSAGES_ERROR,
  SET_STUDY_ID,
  SET_SITE_ID,
  SET_CURRENT_PATIENT_ID,
  SET_CURRENT_PATIENT_CATEGORY_ID,
  SET_OPEN_PATIENT_MODAL,
  SUBMIT_MOVE_PATIENT_BETWEEN_CATEGORIES,
  MOVE_PATIENT_BETWEEN_CATEGORIES_LOADING,
  MOVE_PATIENT_BETWEEN_CATEGORIES_SUCCESS,
  MOVE_PATIENT_BETWEEN_CATEGORIES_FAILED,
  SUBMIT_TEXT_BLAST,
  SUBMIT_PATIENT_IMPORT,
  SUBMIT_ADD_PATIENT,
  SUBMIT_ADD_PATIENT_INDICATION,
  SUBMIT_REMOVE_PATIENT_INDICATION,
  SUBMIT_PATIENT_UPDATE,
  SUBMIT_PATIENT_NOTE,
  SUBMIT_DELETE_NOTE,
  SUBMIT_DELETE_NOTE_SUCCESS,
  SUBMIT_PATIENT_TEXT,
  ADD_PATIENT_INDICATION_SUCCESS,
  REMOVE_PATIENT_INDICATION_SUCCESS,
  UPDATE_PATIENT_SUCCESS,
  ADD_PATIENT_NOTE_SUCCESS,
  ADD_PATIENT_TEXT_SUCCESS,
  SWITCH_TO_NOTE_SECTION_DETAIL,
  SWITCH_TO_TEXT_SECTION_DETAIL,
  SWITCH_TO_EMAIL_SECTION_DETAIL,
  SWITCH_TO_OTHER_SECTION_DETAIL,
} from './constants';

export function campaignsFetched(payload) {
  return {
    type: FETCH_CAMPAIGNS_SUCCESS,
    payload,
  };
}

export function findPatientsForTextBlast(studyId, text, categoryIds, sourceIds) {
  return {
    type: FIND_PATIENTS_TEXT_BLAST,
    studyId,
    text,
    categoryIds,
    sourceIds,
  };
}

export function findPatientsForTextBlastSuccess(payload) {
  return {
    type: FIND_PATIENTS_TEXT_BLAST_SUCCESS,
    payload,
  };
}

export function filterPatientsForTextBlast(text) {
  return {
    type: FILTER_PATIENTS_TEXT_BLAST,
    text,
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

export function removePatientsFromTextBlast() {
  return {
    type: REMOVE_PATIENTS_FROM_TEXT_BLAST,
  };
}

export function fetchPatients(studyId, siteId, text, campaignId, sourceId) {
  return {
    type: FETCH_PATIENTS,
    studyId,
    siteId,
    text,
    campaignId,
    sourceId,
  };
}


export function exportPatients(studyId, siteId, text, campaignId, sourceId) {
  return {
    type: EXPORT_PATIENTS,
    studyId,
    siteId,
    text,
    campaignId,
    sourceId,
  };
}

export function patientsExported() {
  return {
    type: EXPORT_PATIENTS_SUCCESS,
  };
}

export function setStudyId(id) {
  return {
    type: SET_STUDY_ID,
    id,
  };
}

export function setSiteId(id) {
  return {
    type: SET_SITE_ID,
    id,
  };
}

export function patientsFetched(payload) {
  return {
    type: FETCH_PATIENTS_SUCCESS,
    payload,
  };
}

export function fetchPatientDetails(patientId) {
  return {
    type: FETCH_PATIENT_DETAILS,
    patientId,
  };
}

export function patientDetailsFetched(payload) {
  return {
    type: FETCH_PATIENT_DETAILS_SUCCESS,
    payload,
  };
}

export function fetchPatientCategories(studyId, siteId) {
  return {
    type: FETCH_PATIENT_CATEGORIES,
    studyId,
    siteId,
  };
}

export function patientCategoriesFetched(payload) {
  return {
    type: FETCH_PATIENT_CATEGORIES_SUCCESS,
    payload,
  };
}

export function fetchStudy(studyId, siteId) {
  return {
    type: FETCH_STUDY,
    studyId,
    siteId,
  };
}

export function siteFetched(payload) {
  return {
    type: FETCH_SITE_SUCCESS,
    payload,
  };
}

export function sourcesFetched(payload) {
  return {
    type: FETCH_SOURCES_SUCCESS,
    payload,
  };
}

export function studyFetched(payload) {
  return {
    type: FETCH_STUDY_SUCCESS,
    payload,
  };
}

export function studyViewsStatFetched(payload) {
  return {
    type: FETCH_STUDY_VIEWS_SUCCESS,
    payload,
  };
}

export function readStudyPatientMessages(patientId, studyId) {
  return {
    type: READ_STUDY_PATIENT_MESSAGES,
    patientId,
    studyId,
  };
}

export function readStudyPatientMessagesSuccess(payload) {
  return {
    type: READ_STUDY_PATIENT_MESSAGES_SUCCESS,
    payload,
  };
}

export function readStudyPatientMessagesError(payload) {
  return {
    type: READ_STUDY_PATIENT_MESSAGES_ERROR,
    payload,
  };
}

export function patientReferralStatFetched(payload) {
  return {
    type: FETCH_STUDY_PATIENT_REFERRALS_SUCCESS,
    payload,
  };
}

export function callStatsFetched(payload) {
  return {
    type: FETCH_STUDY_CALLS_SUCCESS,
    payload,
  };
}

export function textStatsFetched(payload) {
  return {
    type: FETCH_STUDY_TEXTS_SUCCESS,
    payload,
  };
}

export function setCurrentPatientId(id) {
  return {
    type: SET_CURRENT_PATIENT_ID,
    id,
  };
}

export function setCurrentPatientCategoryId(id) {
  return {
    type: SET_CURRENT_PATIENT_CATEGORY_ID,
    id,
  };
}

export function setOpenPatientModal(show) {
  return {
    type: SET_OPEN_PATIENT_MODAL,
    show,
  };
}

export function submitAddPatientIndication(patientId, indication) {
  return {
    type: SUBMIT_ADD_PATIENT_INDICATION,
    patientId,
    indication,
  };
}

export function submitRemovePatientIndication(patientId, indicationId) {
  return {
    type: SUBMIT_REMOVE_PATIENT_INDICATION,
    patientId,
    indicationId,
  };
}

export function submitPatientUpdate(patientId, fields) {
  return {
    type: SUBMIT_PATIENT_UPDATE,
    patientId,
    fields,
  };
}

export function addPatientIndicationSuccess(patientId, indication) {
  return {
    type: ADD_PATIENT_INDICATION_SUCCESS,
    patientId,
    indication,
  };
}

export function removePatientIndicationSuccess(patientId, indicationId) {
  return {
    type: REMOVE_PATIENT_INDICATION_SUCCESS,
    patientId,
    indicationId,
  };
}

export function updatePatientSuccess(payload) {
  return {
    type: UPDATE_PATIENT_SUCCESS,
    payload,
  };
}

export function addPatientNoteSuccess(currentUser, payload) {
  return {
    type: ADD_PATIENT_NOTE_SUCCESS,
    currentUser,
    payload,
  };
}

export function addPatientTextSuccess(payload) {
  return {
    type: ADD_PATIENT_TEXT_SUCCESS,
    payload,
  };
}

export function submitMovePatientBetweenCategories(studyId, fromCategoryId, toCategoryId, patientId) {
  return {
    type: SUBMIT_MOVE_PATIENT_BETWEEN_CATEGORIES,
    studyId,
    fromCategoryId,
    toCategoryId,
    patientId,
  };
}

export function movePatientBetweenCategoriesLoading() {
  return {
    type: MOVE_PATIENT_BETWEEN_CATEGORIES_LOADING,
  };
}

export function movePatientBetweenCategoriesSuccess(fromCategoryId, toCategoryId, patientId) {
  return {
    type: MOVE_PATIENT_BETWEEN_CATEGORIES_SUCCESS,
    fromCategoryId,
    toCategoryId,
    patientId,
  };
}

export function movePatientBetweenCategoriesFailed() {
  return {
    type: MOVE_PATIENT_BETWEEN_CATEGORIES_FAILED,
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

export function submitPatientNote(studyId, patientId, currentUser, note) {
  return {
    type: SUBMIT_PATIENT_NOTE,
    studyId,
    patientId,
    currentUser,
    note,
  };
}

export function submitDeleteNote(patientId, noteId) {
  return {
    type: SUBMIT_DELETE_NOTE,
    patientId,
    noteId,
  };
}

export function deletePatientNoteSuccess(noteId) {
  return {
    type: SUBMIT_DELETE_NOTE_SUCCESS,
    noteId,
  };
}

export function submitPatientText(studyId, patientId, text) {
  return {
    type: SUBMIT_PATIENT_TEXT,
    studyId,
    patientId,
    text,
  };
}

export function submitPatientImport(studyId, file, onClose) {
  return {
    type: SUBMIT_PATIENT_IMPORT,
    studyId,
    file,
    onClose,
  };
}

export function submitAddPatient(studyId, patient, onClose) {
  return {
    type: SUBMIT_ADD_PATIENT,
    studyId,
    patient,
    onClose,
  };
}

export function switchToNoteSectionDetail() {
  return {
    type: SWITCH_TO_NOTE_SECTION_DETAIL,
  };
}

export function switchToTextSectionDetail() {
  return {
    type: SWITCH_TO_TEXT_SECTION_DETAIL,
  };
}

export function switchToEmailSectionDetail() {
  return {
    type: SWITCH_TO_EMAIL_SECTION_DETAIL,
  };
}

export function switchToOtherSectionDetail() {
  return {
    type: SWITCH_TO_OTHER_SECTION_DETAIL,
  };
}
