import { createSelector } from 'reselect';

const selectHomePageDomain = () => state => state.homePage;

const selectHomePage = () => createSelector(
  selectHomePageDomain(),
  substate => substate
);

const selectPatientSignUps = () => createSelector(
  selectHomePageDomain(),
  substate => substate.patientSignUps
);

const selectPatientMessages = () => createSelector(
  selectHomePageDomain(),
  substate => substate.patientMessages
);

const selectRewardsPoint = () => createSelector(
  selectHomePageDomain(),
  substate => substate.rewardsPoint
);

const selectStudies = () => createSelector(
  selectHomePageDomain(),
  substate => substate.studies
);

const selectSelectedIndicationLevelPrice = () => createSelector(
  selectHomePageDomain(),
  substate => substate.selectedIndicationLevelPrice
);

const selectRenewedStudy = () => createSelector(
  selectHomePageDomain(),
  substate => substate.renewedStudy
);

const selectUpgradedStudy = () => createSelector(
  selectHomePageDomain(),
  substate => substate.upgradedStudy
);

const selectEditedStudy = () => createSelector(
  selectHomePageDomain(),
  substate => substate.editedStudy
);

export default selectHomePage;
export {
  selectHomePageDomain,
  selectPatientSignUps,
  selectPatientMessages,
  selectRewardsPoint,
  selectStudies,
  selectSelectedIndicationLevelPrice,
  selectRenewedStudy,
  selectUpgradedStudy,
  selectEditedStudy,
};
