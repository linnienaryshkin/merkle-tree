import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  testEnvironment: 'node',
  roots: ['<rootDir>'],
  testMatch: ['**/*.test.ts'],
  collectCoverageFrom: ['src/**/*', 'cdk/**/*'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
};

export default config;
