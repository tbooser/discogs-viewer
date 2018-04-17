import React, { Component } from "react";
import { connect } from "react-redux";

export class RecordCollectionItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
      current_track: null
    };
  }

  getYoutubeVideos(event) {
    event.preventDefault();
    this.props.getYoutubeVideo(this.props.resource_url);
    this.setState({ current_track: this });
    window.scrollTo(this);
    console.log("this.state", this.state);
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
        <th onClick={this.getYoutubeVideos.bind(this)}>
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

export default connect(mapStateToProps)(RecordCollectionItem);
