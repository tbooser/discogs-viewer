import React, { Component } from "react";
import Youtube from "./Youtube.jsx";
import { connect } from "react-redux";

export class MusicPlayerBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    console.log(this.props);
  }

  render() {
    if (this.props.video) {
      return (
        <div className="music-player-bar">
          <Youtube videoId={this.props.videoId} />
        </div>
      );
    } else {
      return <div />;
    }
  }
}

function mapStateToProps(state) {
  return {
    app: state
  };
}

export default connect(mapStateToProps)(MusicPlayerBar);
