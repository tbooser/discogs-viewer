import React, { Component } from "react";
import { connect } from "react-redux";
import RenderRecords from "./RenderRecords.jsx";
import LoadingSpinner from "./LoadingSpinner";
import { bindActionCreators } from "redux";
import * as recordActions from "../../actions/loadRecordsActions";

export class App extends Component {
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
      return <LoadingSpinner />;
    } else {
      return (
        <div className="container">
          <RenderRecords />
        </div>
      );
    }
  }

  render() {
    return <div className="App">{this.loadingSpinner()}</div>;
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
