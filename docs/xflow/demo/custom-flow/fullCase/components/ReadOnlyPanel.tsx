import '../index.less';

const ReadOnlyPanel = (props) => {
  const { value } = props;

  return <div className="smart-read-only-panel">{value?? '-'}</div>;
};

export default ReadOnlyPanel;
