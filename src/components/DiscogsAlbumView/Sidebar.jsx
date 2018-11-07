import React from "react";

export default function Sidebar() {
  return (
    <div className="col-sm-12 col-lg-3">
      <div className="sidebar">
        <div className="go-to-button-container">
          <a href="/">
            <button type="button" className="btn btn-dark">
              <i className="fas fa-arrow-left" /> Go to table view
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}
