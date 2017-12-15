/**
*
* AddCreditsModal
*
*/

import React from 'react';
import { Modal } from 'react-bootstrap';
import ShoppingCartForm from 'components/ShoppingCartForm';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { addCredits, getCreditsPrice } from 'containers/App/actions';
import { selectCurrentUser, selectAddCredits, selectCreditsPrice } from 'containers/App/selectors';
import './styles.less';

class AddCreditsModal extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    showModal: React.PropTypes.bool,
    closeModal: React.PropTypes.func,
    addCredits: React.PropTypes.func,
    currentUser: React.PropTypes.object,
    addCreditsOperation: React.PropTypes.object,
    getCreditsPrice: React.PropTypes.func,
    creditsPrice: React.PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.incQuantity = this.incQuantity.bind(this);
    this.decQuantity = this.decQuantity.bind(this);
    this.addCreditsSubmit = this.addCreditsSubmit.bind(this);

    this.state = {
      quantity: 1,
      credits: 0,
      price: 0,
    };
  }

  componentDidMount() {
    this.props.getCreditsPrice();
  }

  componentWillReceiveProps(newProps) {
    if (!newProps.addCreditsOperation.adding && this.props.addCreditsOperation.adding) {
      this.props.closeModal();
    }
    if (newProps.creditsPrice.price && !this.props.creditsPrice.price) {
      this.setState({
        quantity: 1,
        credits: newProps.creditsPrice.attributes.amount,
        price: newProps.creditsPrice.price,
      });
    }
  }

  incQuantity() {
    if (this.state.quantity < 999) {
      this.setState({
        quantity: this.state.quantity + 1,
        credits: (this.state.quantity + 1) * this.props.creditsPrice.attributes.amount,
        price: (this.state.quantity + 1) * this.props.creditsPrice.price,
      });
    }
  }

  decQuantity() {
    if (this.state.quantity > 1) {
      this.setState({
        quantity: this.state.quantity - 1,
        credits: (this.state.quantity - 1) * this.props.creditsPrice.attributes.amount,
        price: (this.state.quantity - 1) * this.props.creditsPrice.price,
      });
    }
  }

  addCreditsSubmit(cartValues) {
    const data = {
      quantity: this.state.quantity,
      totalAmount: cartValues.total,
      cardId: cartValues.creditCard,
    };
    this.props.addCredits(this.props.currentUser.roleForClient.client.stripeCustomerId, data);
  }


  render() {
    const products = [
      {
        title: '100 Credits',
        quantity: parseFloat(this.state.credits),
        price: this.state.price,
        total: this.state.price,
      },
    ];
    return (
      <div>
        <Modal className="custom-modal add-credits" id="add-credits" show={this.props.showModal} onHide={this.props.closeModal}>
          <Modal.Header>
            <Modal.Title>Add Credits</Modal.Title>
            <a className="lightbox-close close" onClick={this.props.closeModal}>
              <i className="icomoon-icon_close" />
            </a>
          </Modal.Header>
          <Modal.Body>
            <div className="holder clearfix">
              <div className="form-study">
                <div className="pull-left col">
                  <div className="scroll jcf--scrollable">
                    <div className="holder-inner">
                      <div className="form-fields">
                        <div className="field-row">
                          <strong className="label required"><label htmlFor="quantity">QUANTITY</label></strong>
                          <div className="field">
                            <span className="jcf-number parent-active">
                              <input type="number" value={this.state.quantity} id="quantity" className="form-control jcf-real-element field-active" readOnly />
                              <span className="jcf-btn-inc" onClick={this.incQuantity} />
                              <span className="jcf-btn-dec" onClick={this.decQuantity} />
                            </span>
                          </div>
                        </div>

                        <div className="field-row">
                          <strong className="label"><label htmlFor="credits">CREDITS</label></strong>
                          <div className="field"> ``
                            <input className="form-control" value={this.state.credits} type="text" name="credits" disabled />
                          </div>
                        </div>

                        <div className="field-row">
                          <strong className="label"><label htmlFor="price">PRICE</label></strong>
                          <div className="field">
                            <input className="form-control" value={`$${this.state.price / 100}`} type="text" name="price" disabled />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pull-left col">
                  <ShoppingCartForm showCards noBorder onSubmit={this.addCreditsSubmit} addOns={products} />
                </div>
              </div>

            </div>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser(),
  addCreditsOperation: selectAddCredits(),
  creditsPrice: selectCreditsPrice(),
});

function mapDispatchToProps(dispatch) {
  return {
    addCredits: (customerId, data) => dispatch(addCredits(customerId, data)),
    getCreditsPrice: () => dispatch(getCreditsPrice()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCreditsModal);
