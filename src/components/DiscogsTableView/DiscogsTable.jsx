import React, { Component } from "react";
import { connect } from "react-redux";
import RecordCollectionItem from "./RecordCollectionItem.jsx";
import { bindActionCreators } from "redux";
import * as recordActions from "../../actions/loadRecordsActions";
const _ = require("underscore");
import DiscogsTableView from "./DiscogsTableView.jsx";

export class DiscogsTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      records: null,
      isFetching: true
    };

    this.renderCollection = this.renderCollection.bind(this);
  }

  renderCollection() {
    const records = this.props.app.loadRecordsByUsername.records;
    for (var i = 0; i < records.length; i++) {
      if (records.length > 1 && records[i].response !== undefined) {
        const shuffledRecords = records[i].response;
        return shuffledRecords.map(item => {
          return (
            <RecordCollectionItem
              id={item.id}
              key={Math.random()}
              year={item.basic_information.year}
              recordTitle={item.basic_information.title}
              imgSrc={item.basic_information.cover_image}
              label={item.basic_information.labels[0].name}
              resource_url={item.basic_information.resource_url}
              artistName={item.basic_information.artists[0].name}
            />
          );
        });
      }
    }
  }

  render() {
    const renderCollection = this.renderCollection();

    return (
      <div>
        <DiscogsTableView collection={renderCollection} />
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

export default connect(mapStateToProps, mapDispatchToProps)(DiscogsTable);
