import React, { Component } from "react";
import { connect } from "react-redux";

export class RecordCollectionItemInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="record-info" onClick={this.getYoutubeVideos}>
        <p>
          <span className="record-text">Artist - </span>
          {this.props.artistName}
        </p>
        <p>
          <span className="record-text">Title - </span>
          {this.props.recordTitle}
        </p>
        <p>
          <span className="record-text">Label - </span>
          {this.props.label}
        </p>
        <p>
          <span className="record-text" />
          {this.props.year}
        </p>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    app: state
  };
}

export default connect(mapStateToProps)(RecordCollectionItemInfo);
