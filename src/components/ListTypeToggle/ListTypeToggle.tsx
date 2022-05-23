interface ListTypeToggleProps {
  listTypeClickHandler: (event: any) => void;
  listType: string;
  collectionSize: number;
  wantlistSize: number;
}

const ListTypeToggle = (props: ListTypeToggleProps) => {
  const { listTypeClickHandler, listType, collectionSize, wantlistSize } = props;

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
      <span onClick={listTypeClickHandler} data-name="collection" className={collectionListClassName()}>
        Collection <span data-name="collection">&nbsp;{collectionSize}</span>
      </span>
      <span onClick={listTypeClickHandler} data-name="wantlist" className={wantlistListClassName()}>
        Wantlist <span data-name="wantlist">&nbsp;{wantlistSize}</span>
      </span>
    </div>
  );
};

export default ListTypeToggle;
