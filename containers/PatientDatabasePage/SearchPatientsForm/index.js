import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Field, reduxForm } from 'redux-form';
import Button from 'react-bootstrap/lib/Button';
import _, { map } from 'lodash';

import Input from '../../../components/Input';
import ReactSelect from '../../../components/Input/ReactSelect';
import { selectSearchPatientsFormError } from './selectors';
import { selectPatientCategories, selectPatients, selectPatientDatabaseFormValues } from '../../../containers/PatientDatabasePage/selectors';
import { selectIndications, selectSources } from '../../../containers/App/selectors';
import formValidator from './validator';
import LoadingSpinner from '../../../components/LoadingSpinner';
import './styles.less';

import ReactMultiSelect from '../../../components/Input/ReactMultiSelect';

const mapStateToProps = createStructuredSelector({
  indications: selectIndications(),
  sources: selectSources(),
  patientCategories: selectPatientCategories(),
  patients: selectPatients(),
  hasError: selectSearchPatientsFormError(),
  formValues: selectPatientDatabaseFormValues(),
});

@reduxForm({ form: 'searchPatients', validate: formValidator })
@connect(mapStateToProps, null)

class SearchPatientsForm extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    indications: PropTypes.array,
    sources: PropTypes.array,
    patientCategories: PropTypes.object,
    patients: PropTypes.object,
    hasError: PropTypes.bool,
    handleSubmit: PropTypes.func,
    formValues: PropTypes.object,
    onSubmit: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      searchTimer: null,
    };

    this.initSearch = this.initSearch.bind(this);
  }

  initSearch(e, name) {
    const params = this.props.formValues;
    if (e && e.target) {
      params[e.target.name] = e.target.value;
      if (this.state.searchTimer) {
        clearTimeout(this.state.searchTimer);
        this.setState({ searchTimer: null });
      }
      const timerH = setTimeout(() => { this.props.onSubmit(params, true); }, 500);
      this.setState({ searchTimer: timerH });
    } else {
      params[name] = e;
      this.props.onSubmit(params, true);
    }
  }

  render() {
    const { formValues, indications, sources, patientCategories, patients, hasError, handleSubmit } = this.props;

    const includeIndicationArr = [];
    let finalIncludeIndication = [];
    const excludeIndicationArr = [];
    let finalExcludeIndication = [];

    for (const val of indications) {
      if (!formValues.includeIndication || formValues.includeIndication.length === 0 || !_.find(formValues.includeIndication, (o) => (o.id === val.id))) {
        includeIndicationArr.push({
          label: val.name,
          value: val.id,
          id: val.id,
        });
      } else {
        finalIncludeIndication.push({
          label: val.name,
          value: val.id,
          id: val.id,
        });
      }

      if (!formValues.excludeIndication || formValues.excludeIndication.length === 0 || !_.find(formValues.excludeIndication, (o) => (o.id === val.id))) {
        excludeIndicationArr.push({
          label: val.name,
          value: val.id,
          id: val.id,
        });
      } else {
        finalExcludeIndication.push({
          label: val.name,
          value: val.id,
          id: val.id,
        });
      }
    }

    finalIncludeIndication = _.concat(finalIncludeIndication, includeIndicationArr);
    finalExcludeIndication = _.concat(finalExcludeIndication, excludeIndicationArr);


    const sourceOptions = map(sources, sourceIterator => ({
      label: sourceIterator.type,
      value: sourceIterator.id,
    }));
    const statusOptions = map(patientCategories.details, patientCategoryIterator => ({
      label: patientCategoryIterator.name,
      value: patientCategoryIterator.id,
    }));
    const genderOptions = [
      {
        label: 'All',
        value: 'All',
      }, {
        label: 'Male',
        value: 'Male',
      }, {
        label: 'Female',
        value: 'Female',
      },
    ];

    const itemTemplate = (controlSelectedValue) => (
      <div key={controlSelectedValue.value}>
        {controlSelectedValue.label}
        <i className="close-icon icomoon-icon_close"></i>
      </div>
    );

    const selectedItemsTemplate = (controlSelectedValue) => (
      <div>
        {controlSelectedValue.length} item(s) selected
      </div>
    );

    return (
      <form className="form-search" onSubmit={handleSubmit}>
        <div className="fields-holder clearfix">

          <div className="search-area pull-left">
            <span className="title">
            </span>
            <div className="field">
              <Field
                name="name"
                component={Input}
                type="text"
                placeholder="Search"
                className="keyword-search"
                disabled={patients.fetching}
                onChange={(e) => this.initSearch(e, 'name')}
              />
              <label htmlFor="search">
                <i className="icomoon-icon_search2" />
              </label>
            </div>
          </div>

          <div className="select-holder indication pull-left">
            <span className="title">
              <label>Include Indication</label>
            </span>
            <div className="field">
              <Field
                name="includeIndication"
                component={ReactMultiSelect}
                placeholder="Select Indication"
                searchPlaceholder="Search Indication"
                searchable
                optionLabelKey="label"
                multiple
                onChange={(e) => this.initSearch(e, 'includeIndication')}
                customOptionTemplateFunction={itemTemplate}
                customSelectedValueTemplateFunction={selectedItemsTemplate}
                dataSource={finalIncludeIndication}
              />
            </div>
          </div>

          <div className="select-holder indication pull-left">
            <span className="title">
              <label>Exclude Indication</label>
            </span>
            <div className="field">
              <Field
                name="excludeIndication"
                component={ReactMultiSelect}
                placeholder="Select Indication"
                searchPlaceholder="Search Indication"
                searchable
                optionLabelKey="label"
                multiple
                onChange={(e) => this.initSearch(e, 'excludeIndication')}
                customOptionTemplateFunction={itemTemplate}
                customSelectedValueTemplateFunction={selectedItemsTemplate}
                dataSource={finalExcludeIndication}
              />
            </div>
          </div>

          <div className="gender gender pull-left">
            <span className="title">
              <label>Gender</label>
            </span>
            <div className="field">
              <Field
                name="gender"
                component={ReactSelect}
                placeholder="Select Gender"
                options={genderOptions}
                disabled={patients.fetching}
                onChange={(e) => this.initSearch(e, 'gender')}
              />
            </div>
          </div>

          <div className="select-holder pull-left clear-left">
            <span className="title">
              <label>Status</label>
            </span>
            <div className="field">
              <Field
                name="status"
                component={ReactSelect}
                placeholder="Select Status"
                options={statusOptions}
                disabled={patients.fetching}
                onChange={(e) => this.initSearch(e, 'status')}
              />
            </div>
          </div>

          <div className="select-holder pull-left">
            <span className="title">
              <label>Source</label>
            </span>
            <div className="field">
              <Field
                name="source"
                component={ReactSelect}
                placeholder="Select Source"
                options={sourceOptions}
                disabled={patients.fetching}
                onChange={(e) => this.initSearch(e, 'source')}
              />
            </div>
          </div>

          <div className="age-range pull-left">
            <span className="title">
              <label>Age Range</label>
            </span>
            <div className="col-holder clearfix">
              <div className="col pull-left">
                <Field
                  name="ageFrom"
                  className="age-from"
                  placeholder="From"
                  component={Input}
                  type="text"
                  disabled={patients.fetching}
                  onChange={(e) => this.initSearch(e, 'ageFrom')}
                />
              </div>
              <div className="col pull-right">
                <Field
                  name="ageTo"
                  className="age-to"
                  placeholder="To"
                  component={Input}
                  type="text"
                  disabled={patients.fetching}
                  onChange={(e) => this.initSearch(e, 'ageTo')}
                />
              </div>
              <span className="sign">-</span>
            </div>
          </div>

          <div className="bmi pull-left">
            <span className="title">
              <label>BMI</label>
            </span>
            <div className="col-holder clearfix">
              <div className="col pull-left">
                <Field
                  name="bmiFrom"
                  className="bmi-from"
                  placeholder="From"
                  component={Input}
                  type="text"
                  disabled={patients.fetching}
                  onChange={(e) => this.initSearch(e, 'bmiFrom')}
                />
              </div>
              <div className="col pull-right">
                <Field
                  name="bmiTo"
                  className="bmi-to"
                  placeholder="To"
                  component={Input}
                  type="text"
                  disabled={patients.fetching}
                  onChange={(e) => this.initSearch(e, 'bmiTo')}
                />
              </div>
              <span className="sign">-</span>
            </div>
          </div>
          <div className="hidden">
            <Button type="submit" bsStyle="primary" className="btn-search" disabled={patients.fetching || hasError}>
              {(patients.fetching)
                ? <LoadingSpinner showOnlyIcon size={20} className="fetching-patients" />
                : <span>Search</span>
              }
            </Button>
          </div>
        </div>
      </form>
    );
  }
}

export default SearchPatientsForm;
