import DiscogsTable from '../DiscogsTable';
import MusicPlayerBar from '../MusicPlayerBar';

const DiscogsTableContainer = () => {
  return (
    <div className="list-view__container-main" key={Math.random()}>
      <DiscogsTable />
      <MusicPlayerBar />
    </div>
  );
};

export default DiscogsTableContainer;
