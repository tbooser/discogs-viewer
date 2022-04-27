import React, { Component } from "react";
import { connect } from "react-redux";
import * as recordActions from "../../actions/loadRecordsActions";
import { bindActionCreators } from "redux";

export class RecordCollectionItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false
    };

    this.getYoutubeVideos = this.getYoutubeVideos.bind(this);
  }

  getYoutubeVideos(event) {
    this.props.actions.recordActions.fetchYoutubeVideos(
      this.props.resource_url,
      this.props.imgSrc
    );
  }

  render() {
    return (
      <div className="list-view__record-item">
      <span>
        <img
          alt="record-album-cover"
          className="record-table-item-image"
          src={this.props.imgSrc}
        />
      </span>
      <span className="record-table-item-info">{this.props.artistName}</span>
      <span className="record-table-item-info">{this.props.recordTitle}</span>
      <span className="record-table-item-info">{this.props.label}</span>
      <span className="record-table-item-info">{this.props.year}</span>
      <span onClick={this.getYoutubeVideos}>
        <i className="fas fa-headphones" />
      </span>
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

export default connect(mapStateToProps, mapDispatchToProps)(
  RecordCollectionItem
);
