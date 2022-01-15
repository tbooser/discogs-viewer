import React, { Component } from "react";
import { connect } from "react-redux";
// import RecordCollectionItem from "./RecordCollectionItem.jsx";
import { bindActionCreators } from "redux";
import * as recordActions from "../../actions/loadRecordsActions";
const _ = require("underscore");
import Header from "./Header.jsx";

export class DiscogsTableView extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.collection = this.collection.bind(this);
  }

  collection() {
    return this.props.collection;
  }

  render() {
    // return (
    //   <div className="col-sm-12">
    //     <div className="container">
    //       <Header randomize={this.randomizeCollection} />
    //       <table className="table table-hover mt-4">
    //         <thead className="thead-light">
    //           <tr>
    //             <th scope="col" />
    //             <th className="table-head-column-name" scope="col">
    //               Artist
    //             </th>
    //             <th className="table-head-column-name" scope="col">
    //               Title
    //             </th>
    //             <th className="table-head-column-name" scope="col">
    //               Label
    //             </th>
    //             <th className="table-head-column-name" scope="col">
    //               Catalog #
    //             </th>
    //             <th className="table-head-column-name" scope="col">
    //               Year
    //             </th>
    //             <th scope="col" />
    //             <th scope="col" />
    //           </tr>
    //         </thead>
    //         <tbody>{this.collection()}</tbody>
    //       </table>
    //     </div>
    //   </div>
    // );
    return (  
      <div className="list-view__collection-container">
        <div className="list-view__sort-bar">
          <div>
          </div>
          <div>
            Artist
          </div>
          <div>
            Title
          </div>
          <div>
            Label
          </div>
          <div>
            Year
          </div>
        </div>
        {this.collection()}
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

export default connect(mapStateToProps, mapDispatchToProps)(DiscogsTableView);
