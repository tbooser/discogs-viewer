import React, { Component } from "react";
import { connect } from "react-redux";
import RecordCollectionItem from "./RecordCollectionItem.jsx";
import { bindActionCreators } from "redux";
import * as recordActions from "../../actions/loadRecordsActions";

export class DiscogsTable extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderCollection() {
    let records = this.props.app.loadRecordsByUsername.records;
    for (var i = 0; i < records.length; i++) {
      if (records.length > 1 && records[i].response !== undefined) {
        return records[i].response.map(item => {
          return (
            <RecordCollectionItem
              id={item.id}
              key={Math.random()}
              year={item.basic_information.year}
              recordTitle={item.basic_information.title}
              imgSrc={item.basic_information.cover_image}
              label={item.basic_information.labels[0].name}
              catNo={item.basic_information.labels[0].catno}
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
      <div className="col-sm-12">
        <div className="container">
          <table className="table table-hover">
            <thead className="thead-light">
              <tr>
                <th scope="col" />
                <th className="table-head-column-name" scope="col">
                  Artist
                </th>
                <th className="table-head-column-name" scope="col">
                  Title
                </th>
                <th className="table-head-column-name" scope="col">
                  Label
                </th>
                <th className="table-head-column-name" scope="col">
                  Catalog #
                </th>
                <th className="table-head-column-name" scope="col">
                  Year
                </th>
                <th scope="col" />
                <th scope="col" />
              </tr>
            </thead>
            <tbody>{this.renderCollection()}</tbody>
          </table>
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

export default connect(mapStateToProps, mapDispatchToProps)(DiscogsTable);
