import React, { Component } from "react";
import { connect } from "react-redux";
import RecordCollectionItem from "./RecordCollectionItem.jsx";
import LoadingSpinner from "./LoadingSpinner";

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
            />
          );
        });
      }
    }
  }

  render() {
    return (
      <div className="col-sm-12 col-md-10">
        <div className="container">
          <table className="table table-hover">
            <thead className="thead-light">
              <tr>
                <th scope="col" />
                <th scope="col">Artist</th>
                <th scope="col">Title</th>
                <th scope="col">Label</th>
                <th scope="col">Catalog #</th>
                <th scope="col">Year</th>
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

export default connect(mapStateToProps)(DiscogsTable);
