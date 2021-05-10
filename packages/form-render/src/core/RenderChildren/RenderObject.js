import React from 'react';
import Core from '../index';

const RenderObject = ({
  children = [],
  dataIndex = [],
  displayType,
  hideTitle,
}) => {
  return (
    <>
      {children.map((child, i) => {
        const FRProps = {
          displayType,
          id: child,
          dataIndex,
          hideTitle,
        };
        return <Core key={i.toString()} {...FRProps} />;
      })}
    </>
  );
};

export default RenderObject;
