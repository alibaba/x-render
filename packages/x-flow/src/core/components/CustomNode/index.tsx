import React, { memo } from 'react';
import classNames from 'classnames';
import { Handle, Position } from '@xyflow/react';
import './index.less';

function capitalize(string: string) {
  if (typeof string !== 'string' || string.length === 0) {
    return string;
  }
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default memo((props: any) => {
  const { data, isConnectable, selected, onClick } = props;

  const NodeComponent = NodeComponentMap[`${capitalize(data?.node)}Node`];

  return (
    <div
      className={classNames('node-container', {
        ['node-container-selected']: !!selected,
      })}
    >
      {data?.node !== 'Input' && (
        <Handle
          type="target"
          position={Position.Top}
          isConnectable={isConnectable}
        />
      )}
      <NodeComponent data={data} onClick={() => onClick(data)} />
      {data?.node !== 'Output' && (
        <Handle
          type="source"
          position={Position.Bottom}
          isConnectable={isConnectable}
        />
      )}
    </div>
  );
});
