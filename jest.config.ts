import type { Config } from '@jest/types';

// Sync object
const config: Config.InitialOptions = {
  verbose: true,
  clearMocks: true,
  testEnvironment: 'jsdom',
  transform: {
    '\\.(t|j)sx?$': "ts-jest",
  },
  moduleFileExtensions: ['ts', 'js', 'json', 'tsx','jsx'],
  moduleNameMapper:{
    "\\.(css|less)$": "identity-obj-proxy"
  },
  testMatch: ['**/packages/*/__tests__/*.(spec|test).(js|ts)?(x)'],
  // extensionsToTreatAsEsm:[".ts", ".tsx"],
  preset: 'ts-jest',
  globals: {
    'ts-jest': {
      babelConfig: false,
      tsconfig: './tsconfig.jest.json',
      diagnostics: false,
      useESM:true
    },
  },
  collectCoverage: true, // 开启单测覆盖率
  collectCoverageFrom: ['**/packages/form-render/','!**/node_modules/**','!**/packages/**/es/','!**/packages/**/lib/']
};
export default config;
