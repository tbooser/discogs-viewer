import React from "react";
import discogsImage from "../../images/discogs-logo.png";
import githubLogo from "../../images/GitHub-Mark-120px.png";

export default function Header() {
  return (
    <div className="container">
      <div className="row">
        <div className="header">
          Tim's
          <div className="header-image">
            <img alt="header-discogs" src={discogsImage} />
          </div>
        </div>
        <div className="discogs-header-gh-link align-self-end ml-auto mb-5">
          <a
            target="_blank"
            href="https://github.com/tbooser/portfolio/tree/master/src/components/DiscogsCollectionView"
          >
            <img src={githubLogo} />
          </a>
        </div>
      </div>
    </div>
  );
}
