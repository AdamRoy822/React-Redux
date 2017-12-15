/**
*
* ManageTransferNumber
*
*/

import React, { PropTypes } from 'react';
import formValidator from './validator';
import { reduxForm, FieldArray, change } from 'redux-form';
import RenderSources from './RenderSources';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { selectMangeSourcesFormValues } from 'components/ManageTransferNumberForm/selectors';

const mapStateToProps = createStructuredSelector({
  formValues: selectMangeSourcesFormValues(),
});

@reduxForm({ form: 'manageTransferNumbers', validate: formValidator })
@connect(mapStateToProps)
class ManageTransferNumber extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    sources: PropTypes.array,
    hasError: PropTypes.bool,
    submitting: PropTypes.bool,
    handleSubmit: PropTypes.func,
    dispatch: PropTypes.func.isRequired,
    formValues: PropTypes.object,
  }

  componentWillReceiveProps(newProps) {
    if (newProps.sources.length > 0 && this.props.sources.length === 0) {
      this.props.dispatch(change('manageTransferNumbers', 'sourcesList', newProps.sources));
      this.props.dispatch(change('manageTransferNumbers', 'initialSources', newProps.sources));
    }
  }

  render() {
    const { handleSubmit, submitting, hasError } = this.props;

    return (
      <form className="form-edit-site" onSubmit={handleSubmit}>

        <table className="table table-payment-info">
          <colgroup>
            <col style={{ width: '24%' }} />
            <col style={{ width: '24%' }} />
            <col style={{ width: '24%' }} />
            <col style={{ width: 'auto' }} />
          </colgroup>
          <thead>
            <tr>
              <th>TYPE <i className="caret-arrow"></i></th>
              <th>CALL NUMBER <i className="caret-arrow"></i></th>
              <th>TEXT NUMBER <i className="caret-arrow"></i></th>
              <th>REDIRECT NUMBER <i className="caret-arrow"></i></th>
            </tr>
          </thead>
          <FieldArray
            name="sourcesList"
            component={RenderSources}
            formValues={this.props.formValues}
          />
        </table>

        <div className="btn-block text-right">
          <button type="submit" className="btn btn-default" disabled={hasError || submitting}>
            Submit
          </button>
        </div>
      </form>
    );
  }
}

export default ManageTransferNumber;
