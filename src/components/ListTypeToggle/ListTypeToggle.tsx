interface ListTypeToggleProps {
  listTypeClickHandler: (event: any) => void;
  listType: string;
  collectionListLength: number;
}

const ListTypeToggle = (props: ListTypeToggleProps) => {
  const { listTypeClickHandler, listType, collectionListLength } = props;

  const collectionListClassName = () => {
    let className = 'collection ';
    listType === 'collection' ? (className += 'selected') : null;
    return className;
  };

  const wantlistListClassName = () => {
    let className = 'wantlist ';
    listType === 'wantlist' ? (className += 'selected') : null;
    return className;
  };

  return (
    <div className="list-view__type-toggle">
      <span onClick={listTypeClickHandler} className={collectionListClassName()}>
        Collection <span>&nbsp;{collectionListLength}</span>
      </span>
      <span onClick={listTypeClickHandler} className={wantlistListClassName()}>
        Wantlist <span>&nbsp;{collectionListLength}</span>
      </span>
    </div>
  );
};

export default ListTypeToggle;
