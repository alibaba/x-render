import React from 'react';

export default function ArrowDown({ height, width, onClick }) {
  return (
    <svg
      className="fr-arrow-icon"
      viewBox="0 0 1024 1024"
      width={width || height || 256}
      height={height || width || 256}
      onClick={onClick}
    >
      <path
        d="M755.2 648.362667a42.666667 42.666667 0 0 1 0.554667 60.330666l-213.333334 217.173334a42.666667 42.666667 0 0 1-60.842666 0l-213.333334-217.173334a42.666667 42.666667 0 0 1 60.842667-59.818666L469.333333 791.68V128a42.666667 42.666667 0 1 1 85.333334 0v663.68l140.245333-142.805333a42.666667 42.666667 0 0 1 60.330667-0.512z"
        fill="#1890ff"
      ></path>
    </svg>
  );
}
