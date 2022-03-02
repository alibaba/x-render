import type { Config } from '@jest/types';
import type { InitialOptionsTsJest } from 'ts-jest'
import { defaults as tsjPreset } from 'ts-jest/presets'


// Sync object
const config: Config.InitialOptions = {
  verbose: true,
  collectCoverage: true,
  clearMocks: true,
  testEnvironment: 'jsdom',
  transform: {
    ...tsjPreset.transform,
  },
  moduleFileExtensions: ['ts', 'js', 'json', 'tsx','jsx'],
  testMatch: ['**/packages/*/__tests__/*.(spec|test).(js|ts)?(x)'],
  extensionsToTreatAsEsm:[".ts", ".tsx"],
  preset: 'ts-jest',
  globals: {
    'ts-jest': {
      babelConfig: false,
      tsconfig: './tsconfig.jest.json',
      diagnostics: false,
      useESM:true
    },
  },
};
export default config;
