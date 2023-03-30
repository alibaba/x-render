import React, { useEffect, useRef } from "react";
import createIframe from './utils/createDesignIframe';

import * as settings from "./settings";

import * as defaultWidgets from './widgets';

export default () => {
  const containerRef: any = useRef();

  useEffect(() => {
    const iframe = createIframe();
    containerRef.current.appendChild(iframe);

    iframe.addEventListener('load', () => {
      const iframeWindow: any = iframe.contentWindow;
      iframeWindow.postMessage('Hello from parent!');
    });

    window.addEventListener('message', event => {
      if (event.data.type !== 'engine-load') {
       return;
      }

      const xx: any = [];
      Object.keys(settings).forEach((key) => {
        xx.push(settings[key])
      });

      debugger;

      iframe.contentWindow.getFormRenderMaterial = () => {
        debugger;
      }

      iframe.contentWindow.__FR_ENGINE__.init({
        settings: xx,
        widgets: defaultWidgets, 
        logo: {
          title: 'FormRender'
        }

      });
    });
  }, []);

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%'}}/>
  );
}