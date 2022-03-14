import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import DiscogsTable from '../DiscogsTable';
import LoadingSpinner from '../Loading';
import * as recordActions from '../../actions/loadRecordsActions';
import MusicPlayerBar from '../MusicPlayerBar';

interface DiscogsTableContainerProps {
  actions: object;
}

const DiscogsTableContainer = (props: DiscogsTableContainerProps) => {
  const [isFetching, setIsFetching] = useState(true);
  const getRecordsByUsernameAction = useSelector((state) => state.actions.recordActions.getRecordsByUsername);

  useEffect(() => {
    getRecordsByUsernameAction();
  });

  const loadingSpinner = () => {
    if (isFetching) {
      return (
        <div className="container">
          <div className="row">
            <LoadingSpinner />
          </div>
        </div>
      );
    } else {
      return [
        <div className="list-view__container-main" key={Math.random()}>
          <DiscogsTable />
        </div>,
        <MusicPlayerBar key={Math.random()} />,
      ];
    }
  };

  loadingSpinner();
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

export default DiscogsTableContainer;
