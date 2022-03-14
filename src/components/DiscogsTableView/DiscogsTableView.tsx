import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as recordActions from '../../actions/loadRecordsActions';

interface DiscogsTableViewProps {
  collection: Array<any>;
}

const DiscogsTableView = (props: DiscogsTableViewProps) => {
  const { collection } = props;

  return (
    <div className="list-view__collection-container">
      <div className="list-view__sort-bar">
        <span></span>
        <span>Artist</span>
        <span>Title</span>
        <span>Label</span>
        <span>Year</span>
      </div>
      {collection}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    app: state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      recordActions: bindActionCreators(recordActions, dispatch),
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DiscogsTableView);
