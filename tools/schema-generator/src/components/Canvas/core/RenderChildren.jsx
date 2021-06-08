import React from 'react';
import FR from './index';

const RenderChildren = ({ children = [], preview }) => {
  return (
    <>
      {children.map((child, i) => {
        const FRProps = {
          id: child,
          preview,
        };
        return <FR key={i.toString()} {...FRProps} />;
      })}
    </>
  );
};

export default RenderChildren;
