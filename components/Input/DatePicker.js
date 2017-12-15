/**
*
* Input for react-select
*
*/

import React, { Component, PropTypes } from 'react';
import { Calendar } from 'react-date-range';
import { Modal } from 'react-bootstrap';

import moment from 'moment';

import './date-picker.less';

export default class DatePicker extends Component {
  static propTypes = {
    input: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    className: PropTypes.string,
    initialDate: PropTypes.object.isRequired,
    dateStyle: PropTypes.string,
  }

  static defaultProps = {
    dateStyle: 'MM/DD/YY',
  }

  constructor(props) {
    super(props);

    const { initialDate } = props;
    this.handleInit = this.handleInit.bind(this);

    this.state = {
      date: initialDate,
      modalVisible: false,
    };
  }

  componentWillMount() {
    this.handleInit(this.props.initialDate);
  }

  handleInit = (date) => {
    this.setState({
      date,
    });
    this.props.input.onBlur(date);
  }

  handleSelect = (date) => {
    this.toggleModal(false);
    this.setState({
      date,
    });
    this.props.input.onBlur(date);
  }

  toggleModal = (visible) => {
    this.setState({ modalVisible: visible });
  }

  render() {
    const { name, className, dateStyle, ...rest } = this.props;
    const { date, modalVisible } = this.state;

    const currentDate = new Date();
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    const currentDateString = currentDate.toLocaleDateString('en-us', options);
    const inputComponent = (
      <input
        type="text"
        name={name}
        readOnly
        value={moment(date).format(dateStyle)}
        {...rest}
      />
    );
    const modalComponent = (
      <Modal className="custom-modal datepicker-modal" show={modalVisible} onHide={() => { this.toggleModal(false); }}>
        <div className="datepicker-box datepicker-active" style={{ display: 'block' }}>
          <div className="datepicker-holder">
            <div className="datepicker-frame">
              <div className="datepicker-inner lightbox-content">
                <div className="modal-header head">
                  <strong className="title">CHOOSE START DATE</strong>
                  <a className="lightbox-close close" onClick={() => { this.toggleModal(false); }}>
                    <i className="icomoon-icon_close"></i>
                  </a>
                </div>
                <div className="scroll-holder jcf--scrollable modal-body holder">
                  <Calendar
                    date={date}
                    onChange={this.handleSelect}
                    className="calendar custom-calendar"
                  />
                  <div className="current-date">
                    Today: {currentDateString}
                  </div>
                  <div className="link-holder text-center">
                    <a href="#" onClick={() => { this.toggleModal(false); }}>To Be Determined</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <a href="#" className="datepicker-overlay"></a>
        </div>
      </Modal>
    );

    return (
      <div className={className} onClick={() => { this.toggleModal(true); }}>
        { inputComponent }
        { modalComponent }
      </div>
    );
  }
}
