/*
 *
 * PaymentInformationPage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser, selectCards, selectSavedCard } from 'containers/App/selectors';
import PaymentMethodsForm from 'components/PaymentMethodsForm';
import AddCreditCardModal from 'components/AddCreditCardModal';
import { fetchCards, deleteCard, saveCard } from 'containers/App/actions';

export class PaymentInformationPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    creditCards: PropTypes.object,
    deleteCard: PropTypes.func,
    currentUser: PropTypes.any,
    saveCard: PropTypes.func,
    fetchCards: PropTypes.func,
    savedCard: PropTypes.object,
  }

  constructor(props) {
    super(props);
    this.deleteCard = this.props.deleteCard.bind(this);
    this.saveCard = this.props.saveCard.bind(this);
    this.onSaveCard = this.onSaveCard.bind(this);

    this.showCreditCardModal = this.showCreditCardModal.bind(this);
    this.closeAddCredtCardModal = this.closeAddCredtCardModal.bind(this);

    this.state = {
      showAddCreditCardModal: false,
    };
  }

  componentDidMount() {
    this.props.fetchCards(this.props.currentUser.roleForClient.client.stripeCustomerId);
  }

  componentWillReceiveProps(newProps) {
    if (!newProps.savedCard.saving && this.props.savedCard.saving) {
      this.closeAddCredtCardModal();
    }
  }

  onSaveCard(params) {
    this.props.saveCard(this.props.currentUser.roleForClient.client.stripeCustomerId, params);
  }

  closeAddCredtCardModal() {
    this.setState({ showAddCreditCardModal: false });
  }

  showCreditCardModal() {
    this.setState({ showAddCreditCardModal: true });
  }

  render() {
    let customerId = false;
    if (this.props.currentUser && this.props.currentUser.roleForClient) {
      customerId = parseInt(this.props.currentUser.roleForClient.client.stripeCustomerId, 10);
    }
    let creditCards = [];
    if (this.props.creditCards.details && this.props.creditCards.details.data) {
      creditCards = this.props.creditCards.details.data;
    }
    return (
      <div className="container-fluid">
        <section className="payment-information">
          <h2 className="main-heading">PAYMENT INFORMATION</h2>

          <div>
            <div className="btn-block text-right">
              <a className="btn btn-primary lightbox-opener" onClick={this.showCreditCardModal}>+   ADD  NEW CARD</a>
            </div>
            <AddCreditCardModal addCreditCard={this.onSaveCard} showModal={this.state.showAddCreditCardModal} closeModal={this.closeAddCredtCardModal} />
          </div>

          <PaymentMethodsForm
            creditCards={creditCards}
            deleteCreditCard={this.deleteCard}
            customerId={customerId}
          />
        </section>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser(),
  creditCards: selectCards(),
  savedCard: selectSavedCard(),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchCards: (customerId) => dispatch(fetchCards(customerId)),
    deleteCard: (customerId, cardId) => dispatch(deleteCard(customerId, cardId)),
    saveCard: (customerId, cardData) => dispatch(saveCard(customerId, cardData)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentInformationPage);

