/*
 *
 * Receipts
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { StickyContainer } from 'react-sticky';
const _ = require('lodash');

import {
  getReceipts,
  getPDF,
  setSearchOptions,
  setActiveSort,
} from 'containers/Receipts/actions';
import {
  fetchSites,
  fetchEvents,
} from 'containers/App/actions';
import {
  selectSiteLocations,
  selectCurrentUser,
  selectEvents,
} from 'containers/App/selectors';

import { selectReceiptsList, selectPaginationOptions, selectSearchOptions } from './selectors';
import ReceiptsTable from 'components/ReceiptsTable';
import TableSearchForm from 'components/TableSearchForm';

export class Receipts extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    siteLocations: PropTypes.array,
    unsubscribeFromAll: PropTypes.func,
    unsubscribeFromPageEvent: PropTypes.func,
    fetchSites: PropTypes.func,
    getReceipts: PropTypes.func,
    getPDF: PropTypes.func,
    receipts: PropTypes.array,
    currentUser: PropTypes.any,
    paginationOptions: PropTypes.object,
    searchOptions: PropTypes.array,
    setSearchOptions: PropTypes.func,
    setActiveSort: PropTypes.func,
  };

  constructor(props, context) {
    super(props, context);

    this.getPDF = this.getPDF.bind(this);
    this.search = this.search.bind(this);
    this.selectCurrent = this.selectCurrent.bind(this);
    this.selectAll = this.selectAll.bind(this);

    this.state = {
      range: null,
      site: null,
      searchBy: null,
      processPDF: false,
      receipts: null,
      filteredReceipts: null,
    };
  }

  componentDidMount() {
    this.props.fetchSites();
    this.props.getReceipts(15, 0, this.props.receipts);
  }

  componentWillReceiveProps() {
    // console.log('componentWillReceiveProps', nextProps);
  }

  getPDF() {
    if (this.selectedReceipts) {
      this.props.getPDF(this.selectedReceipts);
    }
  }

  get selectedReceipts() {
    return this.SelectedReceipts;
  }

  set selectedReceipts(value) {
    this.SelectedReceipts = value;
  }

  get searchOptions() {
    return this.SearchOptions;
  }

  set searchOptions(value) {
    this.SearchOptions = value;
  }

  selectCurrent(receipt) {
    this.selectedReceipts = receipt;
  }

  selectAll(receipt) {
    this.selectedReceipts = receipt;
  }

  search(event, type) {
    let options;
    this.searchOptions = this.searchOptions || [];
    if (type === 'search' && event.target.value) {
      options = { data: event.target.value, type };
    } else if (type === 'site') {
      const { siteLocations } = this.props;
      const site = siteLocations[event - 1] || null;
      if (site) {
        options = { data: site, type };
      }
    } else if (type === 'range') {
      options = { data: event, type };
    }

    if (options) {
      if (_.isEmpty(this.searchOptions)) {
        this.searchOptions.push(options);
      } else {
        const el = _.find(this.searchOptions, { type });
        if (el) {
          this.searchOptions[_.findKey(this.searchOptions, el)] = options;
        } else {
          this.searchOptions.push(options);
        }
      }
    } else if (!_.isEmpty(this.searchOptions)) {
      const el = _.find(this.searchOptions, { type });
      if (el) {
        this.searchOptions.splice(_.findKey(this.searchOptions, el), 1);
      }
    }

    this.props.setSearchOptions(this.searchOptions);

    this.props.getReceipts(15, 0, this.props.receipts, this.props.paginationOptions.activeSort, this.props.paginationOptions.activeDirection, this.searchOptions);
  }

  render() {
    return (
      <StickyContainer className="container-fluid">
        <Helmet title="Proposals - StudyKIK" />
        <section className="calendar-section receipts">
          <h2 className="main-heading">RECEIPTS</h2>
          <TableSearchForm
            changeRange={this.changeRange}
            search={this.search}
            createPdf={this.getPDF}
            {...this.props}
          />
          <ReceiptsTable
            selectCurrent={this.selectCurrent}
            selectAll={this.selectAll}
            getReceipts={this.props.getReceipts}
            receipts={this.props.receipts}
            paginationOptions={this.props.paginationOptions}
            searchOptions={this.props.searchOptions}
            setActiveSort={this.props.setActiveSort}
            {...this.props}
          />
        </section>
      </StickyContainer>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  siteLocations : selectSiteLocations(),
  currentUser: selectCurrentUser(),
  receipts: selectReceiptsList(),
  pageEvents: selectEvents(),
  paginationOptions: selectPaginationOptions(),
  searchOptions: selectSearchOptions(),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchEvents: (values) => dispatch(fetchEvents(values)),
    fetchSites: () => dispatch(fetchSites()),
    getReceipts: (limit, offset, receipts, orderBy, orderDir, values) => dispatch(getReceipts(limit, offset, receipts, orderBy, orderDir, values)),
    getPDF: (values) => dispatch(getPDF(values)),
    setSearchOptions: (payload) => dispatch(setSearchOptions(payload)),
    setActiveSort: (sort, direction) => dispatch(setActiveSort(sort, direction)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Receipts);
