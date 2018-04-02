import React, { Component } from "react";
import { connect } from "react-redux";
import HomepageHeader from "./HomepageHeader.jsx";
import HomepageHeroSectionContainer from "./HomepageHeroSectionContainer.jsx";

export class HomepageContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="homepage-container">
        <HomepageHeader />
        <HomepageHeroSectionContainer />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    app: state
  };
}

export default connect(mapStateToProps)(HomepageContainer);
