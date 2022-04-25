import React from 'react';
const loadingSpinner = require('../../images/loading-spinner/puff.svg');
// const loadingSpinner = require('../../images/loading-spinner/puff.svg') as string;

export default function LoadingSpinner() {
  return (
    <div className="container">
      <div className="row">
        <div className="loading-spinner-container">
          <div className="loading-spinner">
            <img alt="loading-spinner" src={loadingSpinner} />
          </div>
        </div>
      </div>
    </div>
  );
}
