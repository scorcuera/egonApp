/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ["**/**/*.test.ts"],
  setupFiles: ["<rootDir>/__tests__/setupEnv.ts"]
 // clearMocks: true
};