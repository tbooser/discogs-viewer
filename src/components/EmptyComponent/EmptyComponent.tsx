import { useContext } from 'react';
import { DiscogsDataContext, DiscogsDataReturnTypes } from '../../context/DiscogsDataProvider';

const EmptyComponent = () => {
  const discogsContext = useContext(DiscogsDataContext) as DiscogsDataReturnTypes;
  const { collectionSize } = discogsContext;
  return <span>{collectionSize}</span>;
};

export default EmptyComponent;
