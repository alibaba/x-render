import { Input } from 'antd';

const customWidget = ({ value, onChange }) => {

  return (
    <Input
      value={value?.inputVal}
      onChange={e => onChange({ inputVal: e.target.value })}
    />
  );
};

export default customWidget;
