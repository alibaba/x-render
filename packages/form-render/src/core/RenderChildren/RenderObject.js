import React from 'react';
import FR from '../index';

// TODO: nanoId 好像没啥用
const RenderObject = ({ children = [], dataIndex = [] }) => {
  return (
    <>
      {children.map((child, i) => {
        const FRProps = {
          id: child,
          dataIndex,
        };
        return <FR key={i.toString()} {...FRProps} />;
      })}
    </>
  );
};

export default RenderObject;
