import React from 'react';

const CustomImg = ({ setting }) => {
  console.log('props', setting);
  return (
    <img src={setting?.imgSrc} alt="logo" width="14px" />
  );
}

export default CustomImg;