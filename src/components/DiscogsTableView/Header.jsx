import React from "react";
import discogsImage from "../../images/discogs-logo.png";
import githubLogo from "../../images/GitHub-Mark-120px.png";

export default function Header() {
  return (
    <div className="container" key={Math.random()}>
      <div className="row ml-auto">
        <a href="/discogs-album-view">
          <button type="button" className="btn btn-link">
            Go to album view
          </button>
        </a>
      </div>
    </div>
  );
}
