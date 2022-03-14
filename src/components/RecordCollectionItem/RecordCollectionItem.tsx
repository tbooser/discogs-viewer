import React, { Component, useState } from 'react';
import { connect } from 'react-redux';
import * as recordActions from '../../actions/loadRecordsActions';
import { bindActionCreators } from 'redux';

interface RecordCollectionItemProps {
  actions: object;
  resource_url: string;
  imgSrc: string;
  artistName: string;
  recordTitle: string;
  label: string;
  year: number;
}

const RecordCollectionItem = (props: RecordCollectionItemProps) => {
  const { actions, resource_url, imgSrc, artistName, recordTitle, label, year } = props;
  const [clicked, setClicked] = useState(false);

  const getYoutubeVideos = (event) => {
    actions.recordActions.fetchYoutubeVideos(resource_url, imgSrc);
  };

  return (
    <div className="list-view__record-item">
      <span>
        <img alt="record-album-cover" className="record-table-item-image" src={imgSrc} />
      </span>
      <span className="record-table-item-info">{artistName}</span>
      <span className="record-table-item-info">{recordTitle}</span>
      <span className="record-table-item-info">{label}</span>
      <span className="record-table-item-info">{year}</span>
      <span onClick={getYoutubeVideos}>
        <i className="fas fa-headphones" />
      </span>
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

export default connect(mapStateToProps, mapDispatchToProps)(RecordCollectionItem);
