import React, { useEffect, useRef } from 'react';

import createIframe from './createIframe';
import * as defaultWidgets from './widgets';
import * as defaultSettings from './settings';

import getAssets from './assets';

interface IProps {
  widgets: any
  settings: any
}

let iframe: any;

const Design = (props: IProps) => {
  const { widgets, settings } = props;
  const containerRef: any = useRef();

  useEffect(() => {
    initIframe();

    window.addEventListener('message', engineOnLoad);
    return () => {
      window.removeEventListener('message', engineOnLoad);
    }
  }, []);

  const initIframe = () => {
    iframe = createIframe();
    containerRef.current.appendChild(iframe);
  }

  const engineOnLoad = (event: any) => {
    if (event.data.type !== 'engine-load') {
      return;
    }

    const assets = getAssets({ ...defaultSettings, ... settings })

    iframe?.contentWindow?.__FR_ENGINE__?.init({
      assets,
      widgets: {
        ...defaultWidgets,
        ...widgets
      },
      logo: {
        title: 'XRender'
      }
    });
  };


  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%'}} />
  );
}

export default Design;