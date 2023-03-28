import React, { useEffect, useRef } from "react";
import createIframe from './utils/createDesignIframe';

export default () => {
  const containerRef: any = useRef();

  useEffect(() => {
    const iframe = createIframe();
    containerRef.current.appendChild(iframe);

    iframe.addEventListener('load', () => {
      const iframeWindow: any = iframe.contentWindow;
      iframeWindow.postMessage('Hello from parent!');
    });

  }, []);

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%'}}/>
  );
}