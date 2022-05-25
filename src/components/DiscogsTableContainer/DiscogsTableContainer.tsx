import DiscogsTable from '../DiscogsTable';

const DiscogsTableContainer = () => {
  return (
    <div className="list-view__container-main" key={Math.random()}>
      <DiscogsTable />
    </div>
  );
};

export default DiscogsTableContainer;
