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
      <tr className="record-table-item">
        <th>
          <img
            alt="record-album-cover"
            className="record-table-item-image"
            src={this.props.imgSrc}
          />
        </th>
        <th className="record-table-item-info">{this.props.artistName}</th>
        <th className="record-table-item-info">{this.props.recordTitle}</th>
        <th className="record-table-item-info">{this.props.label}</th>
        <th className="record-table-item-info">{this.props.catNo}</th>
        <th className="record-table-item-info">{this.props.year}</th>
        <th onClick={this.getYoutubeVideos}>
          <i className="fas fa-headphones" />
        </th>
      </tr>
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
