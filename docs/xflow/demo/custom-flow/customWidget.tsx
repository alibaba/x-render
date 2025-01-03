import { Input } from 'antd';

const customWidget = ({ value, onChange,...rest }) => {
  console.log("参数", rest)
  return (
    <Input
      value={value?.inputVal}
      onChange={e => onChange({ inputVal: e.target.value })}
    />
  );
};

export default customWidget;
