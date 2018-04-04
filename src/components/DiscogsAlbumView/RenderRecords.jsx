import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import RecordItem from "./RecordItem";
import Sidebar from "./Sidebar.jsx";
import * as recordActions from "../../actions/loadRecordsActions";
const _ = require("underscore");

export class RenderRecords extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recordList: [""],
      hovering: false
    };

    this.openYoutubeVideo = this.openYoutubeVideo.bind(this);
    this.handleVideoLoad = this.handleVideoLoad.bind(this);
  }

  componentDidUpdate() {
    this.handleVideoLoad();
  }

  handleVideoLoad() {
    let currentVideoIndex = this.props.app.loadYoutubeVideos.videos.length - 1;
    let currentVideo = this.props.app.loadYoutubeVideos.videos[currentVideoIndex].response;
    if (currentVideo) {
      if (currentVideo.videos === undefined) {
        // If no videos have been uploaded to Discogs for this record
        alert("No videos have been uploaded for this record!");
        return;
      }
      if (currentVideo.videos.length > 1) {
        // If there is more than one video uploaded for this record, i.e. for multiple tracks, select one randomly to open
        var randomVideo =
          currentVideo.videos[Math.floor(Math.random() * currentVideo.videos.length)].uri;
        this.openYoutubeVideo(randomVideo);
      } else {
        // If there is only one video uploaded for this record, open it
        this.openYoutubeVideo(currentVideo.videos[0].uri);
      }
    }
  }

  openYoutubeVideo(video) {
    var newTab = window.open(video, "_blank");
    newTab.focus();
  }

  renderRecords() {
    let records = this.props.app.loadRecordsByUsername.records;
    for (var i = 0; i < records.length; i++) {
      if (records.length > 1 && records[i].response !== undefined) {
        let shuffledRecords = _.shuffle(records[i].response);
        return shuffledRecords.map(item => {
          return (
            <RecordItem
              id={item.id}
              key={Math.random()}
              year={item.basic_information.year}
              recordTitle={item.basic_information.title}
              imgSrc={item.basic_information.cover_image}
              label={item.basic_information.labels[0].name}
              resource_url={item.basic_information.resource_url}
              artistName={item.basic_information.artists[0].name}
              getYoutubeVideo={this.props.actions.recordActions.fetchYoutubeVideos}
            />
          );
        });
      }
    }
  }

  render() {
    return (
      <div className="row">
        <Sidebar />
        <div className="container record-list-container col-sm-12 col-lg-9">
          <div className="record-container-intro-copy " />
          <div className="row">{this.renderRecords()}</div>
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

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      recordActions: bindActionCreators(recordActions, dispatch)
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RenderRecords);
