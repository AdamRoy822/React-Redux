/**
 * Created by mike on 9/27/16.
 */

import { createSelector } from 'reselect';

/**
 * Direct selector to the studyPage state domain
 */
const selectStudyPageDomain = () => state => state.studyPage;

/**
 * Other selectors
 */

export const selectCampaigns = () => createSelector(
  selectStudyPageDomain(),
  (subState) => subState.campaigns
);

export const selectPatientCategories = () => createSelector(
  selectStudyPageDomain(),
  (subState) => subState.patientCategories
);

export const selectCurrentPatientCategoryId = () => createSelector(
  selectStudyPageDomain(),
  (subState) => subState.currentPatientCategoryId
);

export const selectCurrentPatientId = () => createSelector(
  selectStudyPageDomain(),
  (subState) => subState.currentPatientId
);

export const selectCurrentPatientCategory = () => createSelector(
  selectStudyPageDomain(),
  (subState) => {
    if (subState.patientCategories) {
      const filteredPatientCategory = subState.patientCategories.filter(patientCategory => (
        patientCategory.id === subState.currentPatientCategoryId
      ))[0];
      return filteredPatientCategory;
    }
    return null;
  }
);

export const selectCurrentPatient = () => createSelector(
  selectStudyPageDomain(),
  (subState) => {
    if (subState.patientCategories) {
      const filteredPatientCategory = subState.patientCategories.filter(patientCategory => (
        patientCategory.id === subState.currentPatientCategoryId
      ))[0];
      if (filteredPatientCategory && filteredPatientCategory.patients) {
        return filteredPatientCategory.patients.filter(patient => (
          patient.id === subState.currentPatientId
        ))[0];
      }
    }
    return null;
  }
);

export const selectStudyId = () => createSelector(
  selectStudyPageDomain(),
  (subState) => subState.studyId
);

export const selectSiteId = () => createSelector(
  selectStudyPageDomain(),
  (subState) => subState.siteId
);

export const selectSite = () => createSelector(
  selectStudyPageDomain(),
  (subState) => subState.site
);

export const selectSources = () => createSelector(
  selectStudyPageDomain(),
  (subState) => subState.sources
);

export const selectStudy = () => createSelector(
  selectStudyPageDomain(),
  (subState) => subState.study
);

export const selectStudyStats = () => createSelector(
  selectStudyPageDomain(),
  (subState) => subState.stats
);

export const selectFetchingStudy = () => createSelector(
  selectStudyPageDomain(),
  (subState) => subState.fetchingStudy
);

export const selectFetchingPatients = () => createSelector(
  selectStudyPageDomain(),
  (subState) => subState.fetchingPatients
);

export const selectFetchingPatientCategories = () => createSelector(
  selectStudyPageDomain(),
  (subState) => subState.fetchingPatientCategories
);

export const selectCarousel = () => createSelector(
  selectStudyPageDomain(),
  (subState) => subState.carousel
);

export const selectOpenPatientModal = () => createSelector(
  selectStudyPageDomain(),
  (subState) => subState.openPatientModal
);

