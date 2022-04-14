import type { Config } from '@jest/types';

// Sync object
const config: Config.InitialOptions = {
  verbose: true,
  testEnvironment: 'jsdom',
  transform: {
    // '\\.(t|j)sx?$': "ts-jest",
    // "^.+\\.(js|jsx)$": "babel-jest",
    "^.+\\.(ts|tsx|js|jsx)$": "ts-jest"
  },
  transformIgnorePatterns: ["<rootDir>/node_modules/(?!(lodash-es|other-es-lib))"],
  moduleFileExtensions: ['ts', 'js', 'json', 'tsx','jsx'],
  moduleNameMapper:{
    "\\.(css|less)$": "identity-obj-proxy"
  },
  testMatch: ['**/packages/*/__tests__/*.(spec|test).(js|ts)?(x)'],
  preset: 'ts-jest',
  globals: {
    'ts-jest': {
      babelConfig: false,
      tsconfig: './tsconfig.jest.json',
      diagnostics: false,
      useESM: true
    },
  },
  collectCoverage: true, // 开启单测覆盖率
  collectCoverageFrom: [
    "!**/node_modules/**",
    "packages/form-render/src/**",
    "!packages/form-render/src/**/*.d.ts",
    "!packages/form-render/src/form-render-core/src/core/RenderChildren/RenderList/**",
    "!packages/form-render/src/widgets/antd/percentSlider.js",
    "!packages/form-render/src/widgets/antd/html.jsx",
    "!packages/form-render/src/widgets/antd/upload.js",
    "!packages/form-render/src/widgets/antd/urlInput.js",
    // TODO
    "!**/hooks.js",
    "!**/processData.js",
    "!**/useDebounce.js",
    "!**/processData.js",
]
};
export default config;
