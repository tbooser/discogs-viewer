import React from 'react';
const loadingSpinner = require('../../images/record-232421-bg-9ad1e4.gif');

export default function LoadingSpinner() {
  return (
    <div className="container loading-spinner">
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
