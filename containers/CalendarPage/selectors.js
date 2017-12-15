import { createSelector } from 'reselect';

const selectCalendarPageDomain = (state) => state.calendarPage;

const selectPatientsByStudy = createSelector(
  selectCalendarPageDomain,
  (substate) => substate.patientsByStudy,
);

const selectSchedules = createSelector(
  selectCalendarPageDomain,
  (substate) => substate.schedules,
);

export {
  selectCalendarPageDomain,
  selectPatientsByStudy,
  selectSchedules,
};
