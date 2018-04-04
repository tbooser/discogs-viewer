import React from "react";
import loadingSpinner from "../../images/loading-spinner/puff.svg";

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
