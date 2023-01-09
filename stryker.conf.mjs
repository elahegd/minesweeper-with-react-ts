// @ts-check
/** @type {import('@stryker-mutator/api/core').PartialStrykerOptions} */
const config = {
  _comment:
    "This config was generated using 'stryker init'. Please see the guide for more information: https://stryker-mutator.io/docs/stryker-js/guides/react",
  testRunner: "jest",
  reporters: ["progress", "clear-text", "html", "dashboard"],
  coverageAnalysis: "perTest",
  jest: {
    projectType: "create-react-app",
  },
  thresholds: { high: 90, low: 88, break: 85 },
  mutate: [
    // 'src/hooks/useSettings.ts'
    'src/**/*.ts?(x)',
    '!src/**/*@(.test|.spec|Spec|stories|styled).ts?(x)',
    '!src/**/__mocks__/**/*',
    // '!src/components/**/*',
    // '!src/hooks/**/*',
    // '!src/module/**/*'
  ],
  tempDirName: 'strykerTmp',
};
export default config;
