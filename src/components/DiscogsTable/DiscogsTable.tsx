import React, { useState } from 'react';
import { connect } from 'react-redux';
import RecordCollectionItem from '../RecordCollectionItem';
import { bindActionCreators } from 'redux';
import * as recordActions from '../../actions/loadRecordsActions';
import DiscogsTableView from '../DiscogsTableView';

interface DiscogsTableProps {
  app: object;
}

const DiscogsTable = (props: DiscogsTableProps) => {
  const { app } = props;
  const [records, setRecords] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  const renderCollection = () => {
    const records = app.loadRecordsByUsername.records;
    for (let i = 0; i < records.length; i++) {
      if (records.length > 1 && records[i].response !== undefined) {
        const shuffledRecords = records[i].response;
        return shuffledRecords.map((item) => {
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
  };

  return (
    <>
      <DiscogsTableView collection={renderCollection()} />;
    </>
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

export default connect(mapStateToProps, mapDispatchToProps)(DiscogsTable);
