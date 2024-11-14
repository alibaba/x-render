import { memo } from 'react';
import NodeContainer from '../../core/components/NodeContainer';


const getNodeList = (str: string) => {
  try {
    return JSON.parse(str);
  } catch {
    return []
  }
}



export default memo((props: any) => {
  const { onClick, data } = props;
  const nodeList = getNodeList(data?.contentBody);
  
  return (
    <NodeContainer
      className='custom-node-code'
      title={data.code || '条件分支'}
      icon={{
        type: 'icon-switch',
        style: { fontSize: 14, color: '#fff' },
        bgColor: '#06AED4'
      }}
      onClick={onClick}
    >
      {nodeList.map((item: any, index: number) => (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', lineHeight: '22px' }}>
          <span style={{ color: '#676f83', fontSize: '12px' }}>CASE {index+1}</span>
          <span>{item.node}</span>
        </div>
      ))}
    </NodeContainer>
  );
})

