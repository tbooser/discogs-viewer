import React, { Component } from "react";
import Youtube from "./Youtube.jsx";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as recordActions from "../../actions/loadRecordsActions";

export class MusicPlayerBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videoId: null
    };
  }

  componentDidMount() {
    this.getVideoId();
  }

  getVideoId() {
    let currentVideoIndex = this.props.app.loadYoutubeVideos.videos.length - 1;
    let currentVideo = this.props.app.loadYoutubeVideos.videos[
      currentVideoIndex
    ].response;
    if (currentVideo) {
      if (currentVideo.videos === undefined) {
        // If no videos have been uploaded to Discogs for this record
        alert("No videos have been uploaded for this record!");
        return;
      }
      if (currentVideo.videos.length > 1) {
        // If there is more than one video uploaded for this record, i.e. for multiple tracks, select one randomly to open
        var randomVideo =
          currentVideo.videos[
            Math.floor(Math.random() * currentVideo.videos.length)
          ].uri;

        var slicedRandomVideo = randomVideo.slice(
          randomVideo.indexOf("=") + 1,
          randomVideo.length
        );
        this.setState({ videoId: slicedRandomVideo });
        return slicedRandomVideo;
      } else {
        // If there is only one video uploaded for this record, open it
        var singleVideo = currentVideo.videos[0].uri;
        var slicedSingleVideo = singleVideo.slice(
          singleVideo.indexOf("=") + 1,
          singleVideo.length
        );
        this.setState({ videoId: slicedSingleVideo });
        return slicedSingleVideo;
      }
    }
  }

  render() {
    if (this.state.videoId) {
      return (
        <div className="music-player-bar">
          <Youtube videoId={this.state.videoId} />
        </div>
      );
    } else {
      return <div />;
    }
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      recordActions: bindActionCreators(recordActions, dispatch)
    }
  };
}

function mapStateToProps(state) {
  return {
    app: state
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MusicPlayerBar);
