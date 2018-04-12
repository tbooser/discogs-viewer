import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import DiscogsTable from "./DiscogsTable.jsx";
import Sidebar from "./Sidebar.jsx";
import LoadingSpinner from "./LoadingSpinner";
import * as recordActions from "../../actions/loadRecordsActions";

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
  }

  loadingSpinner() {
    if (this.state.isFetching) {
      return (
        <div className="row">
          <LoadingSpinner />
        </div>
      );
    } else {
      return (
        <div className="row">
          <Sidebar />
          <DiscogsTable />
        </div>
      );
    }
  }

  render() {
    return <div className="table-container pt-4 container">{this.loadingSpinner()}</div>;
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
