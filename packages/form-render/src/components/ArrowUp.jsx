import React from 'react';

export default function ArrowUp({ height, width, onClick }) {
  return (
    <svg
      className="fr-arrow-icon"
      viewBox="0 0 1024 1024"
      width={width || height || 256}
      height={height || width || 256}
      onClick={onClick}
    >
      <path
        d="M755.2 375.637333a42.666667 42.666667 0 0 0 0.554667-60.330666l-213.333334-217.173334a42.666667 42.666667 0 0 0-60.842666 0l-213.333334 217.173334a42.666667 42.666667 0 1 0 60.842667 59.818666L469.333333 232.32V896a42.666667 42.666667 0 1 0 85.333334 0V232.32l140.245333 142.805333a42.666667 42.666667 0 0 0 60.330667 0.512z"
        fill="#1890ff"
      ></path>
    </svg>
  );
}
