import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import DiscogsTable from "./DiscogsTable.jsx";
import Sidebar from "./Sidebar.jsx";
import * as recordActions from "../../actions/loadRecordsActions";

export class DiscogsTableContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    this.props.actions.recordActions.getRecordsByUsername();
    console.log("this.props", this.props);
  }

  componentDidUpdate() {
    console.log("this.props updated", this.props);
  }

  render() {
    return (
      <div className="table-container pt-4 container">
        <div className="row">
          <Sidebar />
          <DiscogsTable />
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

export default connect(mapStateToProps, mapDispatchToProps)(DiscogsTableContainer);
