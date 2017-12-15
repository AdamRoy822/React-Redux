/**
*
 * Proposals Form
*
*/

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Field, reduxForm } from 'redux-form';

import { defaultRanges, DateRange } from 'react-date-range';
// import Modal from 'react-bootstrap/lib/Modal';
// import CenteredModal from '../CenteredModal/index';
import Input from 'components/Input';
import ReactSelect from 'components/Input/ReactSelect';

const mapStateToProps = createStructuredSelector({});

@reduxForm({ form: 'ProposalForm' })
@connect(mapStateToProps)
class TableSearchForm extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    siteLocations: PropTypes.array,
    createPdf: PropTypes.func,
    changeRange: PropTypes.func,
    search: PropTypes.func,
  };

  constructor(props, context) {
    super(props, context);

    this.createPdf = this.createPdf.bind(this);
    this.showPopup = this.showPopup.bind(this);
    this.hidePopup = this.hidePopup.bind(this);
    this.changeRange = this.changeRange.bind(this);
    this.handleChange = this.handleChange.bind(this, 'predefined');

    this.state = {
      showPopup: false,
      rangePicker : {},
      linked : {},
      datePicker : null,
      firstDayOfWeek : null,
      predefined : {},
    };
  }

  componentWillReceiveProps() {}

  handleChange(which, payload) {
    this.setState({
      [which] : payload,
    });
  }

  showPopup(ev) {
    ev.preventDefault();
    this.setState({ showPopup: true });
  }

  hidePopup(ev) {
    if (ev) {
      ev.preventDefault();
    }
    this.setState({ showPopup: false });
  }

  createPdf(ev) {
    ev.preventDefault();
    this.props.createPdf();
  }

  changeRange(ev) {
    ev.preventDefault();
    const range = this.state.predefined;
    this.props.search(range, 'range');
    this.hidePopup();
  }

  render() {
    const { predefined } = this.state;
    const format = 'dddd, D MMMM YYYY';
    const { siteLocations } = this.props;
    const state = this.state;

    return (
      <form
        className="form-search clearfix"
      >
        <div className="btns-area pull-right">
          <div className="col pull-right">
            <button
              type="submit"
              className="btn btn-primary pull-right"
              onClick={this.createPdf}
            >
              <i className="icomoon-icon_download" /> DOWNLOAD
            </button>
          </div>

          <div className="col pull-right">
            <a
              href="#date-range"
              className="btn btn-primary lightbox-opener"
              onClick={this.showPopup}
            >
              <i className="icomoon-icon_calendar" /> DATE RANGE
            </a>
          </div>
        </div>

        <div className="fields-holder">
          <div className="search-area pull-left">
            <div className="field">
              <Field
                type="search"
                component={Input}
                id="search"
                name="search"
                placeholder="Search"
                onChange={(event) => this.props.search(event, 'search')}
              />
            </div>
          </div>
          <div className="pull-left custom-select">
            <Field
              name="site"
              component={ReactSelect}
              placeholder="Select Site Location"
              options={siteLocations}
              className="field"
              onChange={(event) => this.props.search(event, 'site')}
            />
          </div>
        </div>

        {/* <Modal
          show={state.showPopup}
          dialogComponentClass={CenteredModal}
        >
          <Modal.Header>
            <div className="head">
              <Modal.Title>
                <strong className="title">DATE RANGE</strong>
              </Modal.Title>
              <a className="lightbox-close close" href="#" onClick={this.hidePopup}><i className="icomoon-icon_close" /></a>
            </div>
          </Modal.Header>
          <Modal.Body>
            <div className="holder">
              <DateRange
                linkedCalendars
                ranges={defaultRanges}
                onInit={this.handleChange}
                onChange={this.handleChange}
              />
              <div className="dateRange-helper">
                <div className="emit-border"></div>
                <div className="right-part">
                  <span className="left">{ predefined.startDate && predefined.startDate.format(format).toString() }</span>
                  <span className="right">{ predefined.endDate && predefined.endDate.format(format).toString() }</span>
                  <div className="btn-block text-right">
                    <a
                      href="#"
                      className="btn btn-default lightbox-close"
                      onClick={this.changeRange}
                    >
                      submit
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal> */}

        <div id="date-range" className={(state.showPopup) ? 'lightbox fixed-popup lightbox-active' : 'lightbox fixed-popup'}>
          <div className="lightbox-holder">
            <div className="lightbox-frame">
              <div className="lightbox-content">
                <div className="head">
                  <strong className="title">DATE RANGE</strong>
                  <a className="lightbox-close close" href="#" onClick={this.hidePopup}><i className="icomoon-icon_close" /></a>
                </div>
                <div className="holder">
                  <DateRange
                    linkedCalendars
                    ranges={defaultRanges}
                    onInit={this.handleChange}
                    onChange={this.handleChange}
                  />
                  <div className="dateRange-helper">
                    <div className="emit-border"></div>
                    <div className="right-part">
                      <span className="left">{ predefined.startDate && predefined.startDate.format(format).toString() }</span>
                      <span className="right">{ predefined.endDate && predefined.endDate.format(format).toString() }</span>
                      <div className="btn-block text-right">
                        <a
                          href="#"
                          className="btn btn-default lightbox-close"
                          onClick={this.changeRange}
                        >
                          submit
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <a href="#" className="overlay lightbox-close" onClick={this.hidePopup} />
        </div>
      </form>
    );
  }
}

export default TableSearchForm;
