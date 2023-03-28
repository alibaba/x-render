import React, { useEffect, useRef } from "react";
import ReactDOM from 'react-dom';

import createIframe from './utils/createDesignIframe';



export default () => {
  const containerRef: any = useRef();

  useEffect(() => {
    const iframe = createIframe();
    containerRef.current.appendChild(iframe);
  }, []);

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%'}}/>
  );
}