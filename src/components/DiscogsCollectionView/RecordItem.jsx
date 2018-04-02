import React, { Component } from "react";
import { connect } from "react-redux";
import { getRecordById } from "../../actions/loadRecordsActions";
import RecordInfo from "./RecordInfo";

export class RecordItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
      hovering: false,
      current_youtube_video_artist: null
    };

    this.handleRecordClick = this.handleRecordClick.bind(this);
    this.getYoutubeVideos = this.getYoutubeVideos.bind(this);
  }

  handleRecordClick() {
    this.getYoutubeVideos();
  }

  getYoutubeVideos() {
    this.props.getYoutubeVideo(this.props.resource_url);
    this.setState({ current_youtube_video_artist: this.props.artistName });
  }

  handleMouseover() {
    this.setState({ hovering: true });
  }

  handleMouseOut() {
    this.setState({ hovering: false });
  }

  render() {
    return (
      <div className="record-item-container card col-sm-3">
        <div
          className="record-image-container card-img-top"
          onClick={this.handleRecordClick}
          key={Math.random()}
        >
          <img
            className="record-image"
            onMouseEnter={this.handleMouseover.bind(this)}
            onMouseOut={this.handleMouseOut.bind(this)}
            src={this.props.imgSrc}
            alt="Record"
            id={this.props.id}
          />
        </div>
        <div className="record-details-container card-body">
          <div className="card-text">
            <RecordInfo
              artistName={this.props.artistName}
              recordTitle={this.props.recordTitle}
              label={this.props.label}
              year={this.props.year}
              resource_url={this.props.resource_url}
              key={this.props.key}
            />
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

export default connect(mapStateToProps, { getRecordById })(RecordItem);
