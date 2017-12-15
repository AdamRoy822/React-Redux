/*
 *
 * ManageTransferNumberPage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { fetchSources, submitSourceForm } from 'containers/ManageTransferNumberPage/actions';
import { selectSources } from 'containers/ManageTransferNumberPage/selectors';
import ManageTransferNumberForm from 'components/ManageTransferNumberForm';

export class ManageTransferNumberPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    fetchSources: PropTypes.func,
    sources: PropTypes.array,
    onSubmitForm: PropTypes.func,
  }

  componentDidMount() {
    this.props.fetchSources();
  }

  render() {
    return (
      <div className="container-fluid">
        <section className="payment-information">
          <h2 className="main-heading">MANAGE TRANSFER NUMBERS</h2>
          <ManageTransferNumberForm
            sources={this.props.sources}
            onSubmit={this.props.onSubmitForm}
          />
        </section>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  sources : selectSources(),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchSources: () => dispatch(fetchSources()),
    onSubmitForm: (values) => dispatch(submitSourceForm(values)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageTransferNumberPage);
