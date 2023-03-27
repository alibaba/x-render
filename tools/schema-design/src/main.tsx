import React, { useEffect, useRef } from "react";
import ReactDOM from 'react-dom';

import createDesignIframe, { createIframeContent } from './utils/createDesignIframe';
import Design from './design'


export default () => {
  const containerRef: any = useRef();

  useEffect(() => {
    const iframe = createDesignIframe();
    containerRef.current.appendChild(iframe);

    iframe.addEventListener('load', () => {
      const container = document.createElement('div');

      if (!iframe.contentDocument) {
        return;
      }

      iframe.contentDocument.body.appendChild(container);
      ReactDOM.render(<Design />, container);
    });
  }, []);

  return (
    <div ref={containerRef} />
  );
}