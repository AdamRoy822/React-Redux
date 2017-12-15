/* eslint-disable react/jsx-first-prop-new-line */

import React, { Component, PropTypes } from 'react';
import Select from 'react-select';
import _ from 'lodash';

class FilterBar extends Component {
  static propTypes = {
    siteLocationOptions: PropTypes.array.isRequired,
    isAdmin: PropTypes.bool.isRequired,
    sites: PropTypes.array.isRequired,
    indications: PropTypes.array.isRequired,
    schedules: PropTypes.array.isRequired,
    fetchingSites: PropTypes.bool,
    filter: PropTypes.object.isRequired,
    updateFilter: PropTypes.func.isRequired,
  }

  state = {
    siteLocation: null,
    indication: null,
    protocol: null,
    indicationOptions: [],
    protocolOptions: [],
  }

  componentDidUpdate(prevProps, prevState) {
    const { siteLocationOptions, isAdmin } = this.props;

    if (!isAdmin) {
      if (prevState.siteLocation === null || prevState.siteLocation.siteId !== this.state.siteLocation.siteId) {  // prevent recursive render
        const site = siteLocationOptions[0];
        if (site) {
          this.handleFilterChange('siteLocation', site);
        }
      }
    }
  }

  handleFilterChange = (field, option) => {
    const newValue = option ? option.value : '';

    switch (field) {
      case 'siteLocation':
        this.handleSiteLocationChoose(option);
        break;
      case 'indication':
        this.handleIndicationChoose(option);
        break;
      default:
        break;
    }

    this.props.updateFilter(field, newValue);
  }

  handleSiteLocationChoose(siteLocationOption) {
    if (siteLocationOption) {
      const selectedSite = this.props.sites.filter(s => s.id === siteLocationOption.siteId)[0];
      if (!selectedSite) {
        throw new Error('SiteLocation options are not properly populated.');
      }
      const indicationIds = _.uniq(selectedSite.studies.map(study => study.indication_id));
      const indicationOptions = indicationIds.map(id => {
        const i = _.find(this.props.indications, { id });
        const protocolOptions = selectedSite.studies.filter(s => s.indication_id === id)
          .map(s => ({
            label: s.protocolNumber,
            value: s.protocolNumber,
          }));
        return {
          label: i.name,
          value: i.name,
          protocolOptions,
        };
      });
      this.setState({
        siteLocation: siteLocationOption,
        protocol: null,
        indicationOptions,
      });
    } else {
      this.setState({
        siteLocation: null,
        indication: null,
        protocol: null,
        indicationOptions: [],
        protocolOptions: [],
      });
    }
  }

  handleIndicationChoose(indicationOption) {
    if (indicationOption) {
      this.setState({
        indication: indicationOption,
        protocolOptions: indicationOption.protocolOptions,
      });
    } else {
      this.setState({
        indication: null,
        protocol: null,
        protocolOptions: [],
      });
    }
  }

  render() {
    const {
      isAdmin,
      siteLocationOptions,
      // schedules,
      fetchingSites,
      filter,
    } = this.props;

    return (
      <form action="#" className="form-search clearfix alt">
        <div className="fields-holder">
          <div className="search-area pull-left">
            <div className="field">
              <input type="search" id="search" className="form-control keyword-search" placeholder="Search"
                onChange={(ev) => this.handleFilterChange('patientName', ev.target)}
              />
              <label htmlFor="search"><i className="icomoon-icon_search2"></i></label>
            </div>
          </div>
          <div className="pull-left custom-select">
            <Select
              className="form-control data-search"
              value={filter.siteLocation}
              disabled={fetchingSites || !isAdmin}
              options={siteLocationOptions}
              placeholder="Select Site Location"
              onChange={(option) => this.handleFilterChange('siteLocation', option)}
            />
          </div>
          <div className="pull-left custom-select">
            <Select
              className="form-control data-search"
              value={filter.indication}
              options={this.state.indicationOptions}
              disabled={this.state.siteLocation === null}
              placeholder={this.state.siteLocation ? 'Select Indication' : 'N/A'}
              onChange={(option) => this.handleFilterChange('indication', option)}
            />
          </div>
          <div className="pull-left custom-select">
            <Select
              className="form-control data-search"
              value={filter.protocol}
              options={this.state.protocolOptions}
              disabled={this.state.indication === null}
              placeholder={this.state.indication ? 'Select Protocol' : 'N/A'}
              onChange={(option) => this.handleFilterChange('protocol', option)}
            />
          </div>
        </div>
      </form>
    );
  }
}

export default FilterBar;
