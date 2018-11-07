import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import DiscogsTable from "./DiscogsTable.jsx";
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

  componentDidMount() {
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
            <DiscogsTable />
          </div>
        </div>,
        <MusicPlayerBar key={Math.random()} />
      ];
    }
  }

  render() {
    const loadingSpinner = this.loadingSpinner();

    return <div className="">{loadingSpinner}</div>;
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
  DiscogsTableContainer
);
