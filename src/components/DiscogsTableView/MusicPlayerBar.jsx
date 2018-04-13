import React, { Component } from "react";
import { connect } from "react-redux";

export class MusicPlayerBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="music-player-bar">
        <div>
          <iframe width="150" height="150" src={this.props.video} frameBorder="0" allowFullScreen />
        </div>
        <button
          type="button"
          className="text-center btn btn-link ytp-play-button ytp-button"
          aria-label="Pause"
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    app: state
  };
}

export default connect(mapStateToProps)(MusicPlayerBar);
