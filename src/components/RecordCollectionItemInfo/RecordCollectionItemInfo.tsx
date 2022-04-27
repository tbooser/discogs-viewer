import React from 'react';

interface RecordCollectionItemInfoProps {
  getYoutubeVideos: () => void;
  artistName: string;
  recordTitle: string;
  label: string;
  year: number;
}

const RecordCollectionItemInfo = (props: RecordCollectionItemInfoProps) => {
  const { getYoutubeVideos, artistName, recordTitle, label, year } = props;
  return (
    <div className="record-info" onClick={getYoutubeVideos}>
      <p>
        <span className="record-text">Artist - </span>
        {artistName}
      </p>
      <p>
        <span className="record-text">Title - </span>
        {recordTitle}
      </p>
      <p>
        <span className="record-text">Label - </span>
        {label}
      </p>
      <p>
        <span className="record-text" />
        {year}
      </p>
    </div>
  );
};

export default RecordCollectionItemInfo;
