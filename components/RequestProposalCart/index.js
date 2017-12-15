/*
 *
 * Fake Shopping Cart on RequestProposalPage
 *
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { find, sumBy } from 'lodash';

import LoadingSpinner from 'components/LoadingSpinner';
import Money from 'components/Money';
import {
  CAMPAIGN_LENGTH_LIST,
  MESSAGING_SUITE_PRICE,
  CALL_TRACKING_PRICE,
} from 'common/constants';
import {
  selectProposalFormValues,
  selectProposalFormError,
} from 'components/RequestProposalForm/selectors';
import {
  selectLevels,
} from 'containers/App/selectors';
import {
  submitForm, fetchCoupon,
} from 'containers/RequestProposalPage/actions';
import {
  selectCoupon,
} from 'containers/RequestProposalPage/selectors';

import './styles.less';

export class RequestProposalCart extends Component {
  static propTypes = {
    levels: PropTypes.array,
    formValues: PropTypes.object,
    coupon: PropTypes.object,
    hasError: PropTypes.bool,
    fetchCoupon: PropTypes.func.isRequired,
    onSubmitForm: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.onFetchCoupon = this.onFetchCoupon.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);
    this.onCouponChange = this.onCouponChange.bind(this);

    this.state = {
      couponId: '',
    };
  }

  onCouponChange(evt) {
    this.setState({
      couponId: evt.target.value,
    });
  }

  onSubmitForm() {
    const { formValues } = this.props;
    this.props.onSubmitForm(formValues);
  }

  onFetchCoupon() {
    this.props.fetchCoupon(this.state.couponId);
  }

  listProducts() {
    const products = [];
    const { formValues, levels } = this.props;

    const level = find(levels, { id: formValues.level_id });
    const months = find(CAMPAIGN_LENGTH_LIST, { value: formValues.campaignLength });
    if (level && months) {
      products.push({
        title: `${months.label} ${level.type}`,
        price: level.price,
        quantity: months.value,
        total: level.price * months.value,
      });
    }

    if (formValues.addPatientMessagingSuite) {
      products.push({
        title: 'Patient Messaging Suite',
        price: MESSAGING_SUITE_PRICE,
        quantity: 1,
        total: MESSAGING_SUITE_PRICE,
      });
    }

    if (formValues.callTracking) {
      products.push({
        title: 'Call Tracking',
        price: CALL_TRACKING_PRICE,
        quantity: 1,
        total: CALL_TRACKING_PRICE,
      });
    }

    return products;
  }

  calculateTotal(products) {
    const { coupon } = this.props;
    const subTotal = sumBy(products, 'total');
    let discount = 0;
    if (coupon.details) {
      if (coupon.details.amount_off) {
        discount = coupon.details.amount_off;
      } else if (coupon.details.percent_off) {
        discount = subTotal * (coupon.details.percent_off / 100);
      }
    }
    const total = subTotal - discount;

    return { subTotal, discount, total };
  }

  render() {
    const { coupon, hasError } = this.props;
    const products = this.listProducts();
    const { subTotal, discount, total } = this.calculateTotal(products);

    return (
      <div className="shopping-cart order-summary order-summery">
        <div className="head">
          <h3>Proposal Summary</h3>
        </div>

        <div className="scroll jcf--scrollabel">
          <div className="scroll-holder">

            <div className="table-holder">
              <table className="table-summary">
                <thead>
                  <tr>
                    <th>PRODUCT <i className="caret-arrow" /></th>
                    <th>PRICE <i className="caret-arrow" /></th>
                    <th>QTY <i className="caret-arrow" /></th>
                    <th>TOTAL <i className="caret-arrow" /></th>
                  </tr>
                </thead>
                <tbody>
                  {products &&
                    products.map((product, index) => (
                      <tr key={index}>
                        <td>{product.title}</td>
                        <td>
                          <Money value={product.price} />
                        </td>
                        <td>{product.quantity}</td>
                        <td>
                          <Money value={product.total} className="price" />
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>

            <div className="coupon-area">
              <input
                type="text"
                placeholder="Coupon"
                className="form-control"
                value={this.state.couponId}
                onChange={this.onCouponChange}
              />
              <button
                className="btn btn-primary coupon-btn"
                onClick={this.onFetchCoupon}
                disabled={coupon.fetching}
              >
                <span>APPLY</span>
              </button>
            </div>

            <div className="total clearfix">
              <span className="heading">Subtotal</span>
              <Money value={subTotal} className="price subtotal-price" />
            </div>

            <div className="total discount clearfix">
              <span className="heading">discount</span>
              {coupon.fetching
                ? <span className="price">
                  <LoadingSpinner showOnlyIcon size={20} className="price" />
                </span>
                : <Money value={discount} className="price discount-amount" />
              }
            </div>

            <div className="total grand-total clearfix">
              <strong className="heading">Total</strong>
              <Money value={total} className="price total-price" />
            </div>

            <input
              type="submit"
              className="btn btn-default"
              disabled={hasError}
              value="submit"
              onClick={this.onSubmitForm}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  coupon: selectCoupon(),
  levels: selectLevels(),
  hasError: selectProposalFormError(),
  formValues: selectProposalFormValues(),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchCoupon: (id) => dispatch(fetchCoupon(id)),
    onSubmitForm: (values) => dispatch(submitForm(values)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RequestProposalCart);
