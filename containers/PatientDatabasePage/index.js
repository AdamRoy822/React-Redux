import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { map, omit, omitBy, isUndefined } from 'lodash';
import { createStructuredSelector } from 'reselect';

import SearchPatientsForm from '../../containers/PatientDatabasePage/SearchPatientsForm/index';
import PatientsList from '../../containers/PatientDatabasePage/PatientsList/index';
import PatientActionButtons from './PatientActionButtons';
import { fetchIndications, fetchSources } from 'containers/App/actions';
import { fetchPatientCategories, fetchPatients } from './actions';
import { selectPaginationOptions, selectPatients } from './selectors';
import './styles.less';

export class PatientDatabasePage extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    fetchIndications: PropTypes.func,
    fetchSources: PropTypes.func,
    fetchPatientCategories: PropTypes.func,
    fetchPatients: PropTypes.func,
    paginationOptions: PropTypes.object,
    patients: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.searchPatients = this.searchPatients.bind(this);
  }

  componentWillMount() {
    this.props.fetchIndications();
    this.props.fetchSources();
    this.props.fetchPatientCategories();
    // this.props.fetchPatients({ limit:15, skip:0 });
  }

  searchPatients(searchFilter, isSearch, isExport = false) {
    const queryParams = omit(omitBy(searchFilter, isUndefined), ['includeIndication', 'excludeIndication']);

    if (searchFilter.includeIndication) {
      queryParams.includeIndication = map(searchFilter.includeIndication, i => i.value).join(',');
    }
    if (searchFilter.excludeIndication) {
      queryParams.excludeIndication = map(searchFilter.excludeIndication, i => i.value).join(',');
    }

    queryParams.limit = 15;
    if (isSearch) {
      queryParams.skip = 0;
    } else {
      queryParams.skip = (this.props.paginationOptions.page) * 15;
    }

    if (searchFilter.sort !== undefined && searchFilter.direction !== undefined) {
      queryParams.sort = searchFilter.sort;
      queryParams.direction = searchFilter.direction;
    } else if (this.props.paginationOptions.activeSort && this.props.paginationOptions.activeDirection) {
      queryParams.sort = this.props.paginationOptions.activeSort;
      queryParams.direction = this.props.paginationOptions.activeDirection;
    }
    this.props.fetchPatients(queryParams, this.props.patients.details, searchFilter, isExport);
  }

  render() {
    return (
      <div className="container-fluid">
        <section className="patient-database">
          <Helmet title="Patient Database - StudyKIK" />
          <h2 className="main-heading">Patient Database</h2>
          <PatientActionButtons searchPatients={this.searchPatients} paginationOptions={this.props.paginationOptions} />

          <SearchPatientsForm onSubmit={this.searchPatients} />

          <PatientsList
            searchPatients={this.searchPatients}
            paginationOptions={this.props.paginationOptions}
          />
        </section>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  paginationOptions: selectPaginationOptions(),
  patients: selectPatients(),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchIndications: () => dispatch(fetchIndications()),
    fetchSources: () => dispatch(fetchSources()),
    fetchPatientCategories: searchParams => dispatch(fetchPatientCategories(searchParams)),
    fetchPatients: (searchParams, patients, searchFilter, isExport) => dispatch(fetchPatients(searchParams, patients, searchFilter, isExport)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientDatabasePage);
