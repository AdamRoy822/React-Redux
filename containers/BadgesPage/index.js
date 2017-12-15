/*
 *
 * BadgesPage
 *
 */

import React from 'react';
import { connect } from 'react-redux';

import varImage from 'assets/images/img10.svg';
import bubbleImage from 'assets/images/foot.svg';


export class BadgesPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  render() {
    return (
      <div className="container-fluid">
        <div className="coming-soon">
          <div className="table-box">
            <div className="table-cell">
              <div className="sub-holder">
                <div className="img-holder">
                  <img src={varImage} alt="man" className="imgage" width="323" height="447" />
                  <img src={bubbleImage} alt="bubble" className="bottom" />
                </div>
                <div className="msg">
                  <strong className="title">COMING SOON!</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default connect(null, null)(BadgesPage);
