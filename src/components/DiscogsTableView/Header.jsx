import React, { Component } from "react";
import { connect } from "react-redux";

export class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.randomize = this.randomize.bind(this);
  }

  randomize() {
    this.props.randomize();
  }

  render() {
    return (
      <div className="container" key={Math.random()}>
        <div className="row">
          <button onClick={this.randomize} className="btn btn-xs btn-primary">
            Randomize <i className="fas fa-random" />
          </button>
          <div className="go-to-button-container ml-auto">
            <a href="/discogs-album-view">
              <button type="button" className="btn btn-dark">
                Go to album view <i className="fas fa-arrow-right" />
              </button>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    app: state
  };
}

export default connect(mapStateToProps)(Header);
