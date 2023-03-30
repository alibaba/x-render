import React, { useEffect, useRef } from "react";
import createIframe from './utils/createDesignIframe';

import * as settings from "./settings";

import * as defaultWidgets from './widgets';


// import { rollup } from 'rollup';
// import commonjs from '@rollup/plugin-commonjs';
// import resolve from '@rollup/plugin-node-resolve';
// import babel from '@rollup/plugin-babel';

import { transform } from '@babel/core';


// const buildComponent = async (code) => {
//   const bundle = await rollup({
//     input: 'component.js',
//     plugins: [
//       babel({
//         exclude: 'node_modules/**',
//         babelHelpers: 'bundled',
//       }),
//       resolve(),
//       commonjs(),
//     ],
//     external: ['react', 'react-dom'],
//   });

//   const { output } = await bundle.generate({
//     format: 'umd',
//     name: 'MyComponent',
//     exports: 'named',
//     sourcemap: true,
//   });

//   const [{ code: umdCode, map: umdMap }] = output;

//   const script = document.createElement('script');
//   script.textContent = umdCode + `\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,${btoa(umdMap.toString())}`;
//   document.body.appendChild(script);

//   return eval(`MyComponent.default || MyComponent`);
// };

// const transformCode = async (code, options = {}) => {
//   const { code: transformedCode } = await transform(code, {
//     sourceType: 'module',
//     ...options,
//   });
//   return transformedCode;
// };

// async function moduleInstanceToCode(moduleInstance) {
//   const moduleUrl = URL.createObjectURL(new Blob([moduleInstance], { type: 'text/javascript' }));
//   const module = await import(moduleUrl);
//   const code = module.default.toString();
//   URL.revokeObjectURL(moduleUrl);
//   return code;
// }



const loadComponent = async (moduleInstance: any) => {
  const code = eval(moduleInstance)

  // const cjsCode = await transformCode(code, {
  //   plugins: ['@babel/plugin-transform-modules-commonjs'],
  // });

  // const Component = await buildComponent(cjsCode.code);
  // debugger;
  // return Component;
};

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


      Object.keys(defaultWidgets).forEach(key => {
        loadComponent(defaultWidgets[key]);
      })





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