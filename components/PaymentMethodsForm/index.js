/**
*
* PaymentMethodsForm
*
*/

import React, { PropTypes } from 'react';
import CardItem from 'components/CardItem';


class PaymentMethodsForm extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    deleteCreditCard: PropTypes.func,
    creditCards: PropTypes.array,
    customerId: PropTypes.any,
  }
  render() {
    const cardsListContents = this.props.creditCards.map((item, index) => (
      <CardItem
        {...item}
        key={index}
        deleteCreditCard={this.props.deleteCreditCard}
        customerId={this.props.customerId}
      />
    ));

    return (
      <div>
        <div className="table-holder payment-table-holder">
          <header>
            <h2>MANAGE PAYMENT METHODS</h2>
          </header>
          <table className="table table-payment-info">
            <colgroup>
              <col style={{ width: '24%' }} />
              <col style={{ width: '24%' }} />
              <col style={{ width: '24%' }} />
              <col style={{ width: 'auto' }} />
            </colgroup>
            <thead>
              <tr>
                <th>CARD TYPE <i className="caret-arrow"></i></th>
                <th>NAME ON CARD <i className="caret-arrow"></i></th>
                <th>LAST 4 DIGITS ON CARD <i className="caret-arrow"></i></th>
                <th>EXPIRATION DATE <i className="caret-arrow"></i></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cardsListContents}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default PaymentMethodsForm;
