import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import DiscogsTable from "./DiscogsTable.jsx";
import Sidebar from "./Sidebar.jsx";
import LoadingSpinner from "./LoadingSpinner";
import * as recordActions from "../../actions/loadRecordsActions";
import MusicPlayerBar from "./MusicPlayerBar.jsx";

export class DiscogsTableContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetching: true
    };

    this.loadingSpinner = this.loadingSpinner.bind(this);
  }

  componentWillMount() {
    this.props.actions.recordActions.getRecordsByUsername();
  }

  componentDidUpdate() {
    if (this.state.isFetching === true) {
      this.setState({ isFetching: false });
    }
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
        // Replace parts of the url so that it can be embedded and autoplayed
        var embedURL = randomVideo
          .replace("watch?v=", "embed/")
          .concat("?autoplay=1")
          .concat("&controls=1");
        return embedURL;
      } else {
        // If there is only one video uploaded for this record, open it
        var embedURL = currentVideo.videos[0].uri
          .replace("watch?v=", "embed/")
          .concat("?autoplay=1");

        return embedURL;
      }
    }
  }

  openYoutubeVideo(video) {
    // var newTab = window.open(video, "_blank");
    // newTab.focus();
    console.log(video);
    return <MusicPlayerBar video={video} />;
  }

  loadingSpinner() {
    if (this.state.isFetching) {
      return (
        <div className="container">
          <div className="row">
            <LoadingSpinner />
          </div>
        </div>
      );
    } else {
      return [
        <div className="table-container pt-4 container" key={Math.random()}>
          <div className="row">
            <Sidebar />
            <DiscogsTable />
          </div>
        </div>,
        <MusicPlayerBar video={this.handleVideoLoad()} key={Math.random()} />
      ];
    }
  }

  render() {
    return <div className="">{this.loadingSpinner()}</div>;
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

export default connect(mapStateToProps, mapDispatchToProps)(DiscogsTableContainer);
