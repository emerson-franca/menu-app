module.exports = {
  preset: "ts-jest",
  testEnvironment: "jest-fixed-jsdom",
  setupFilesAfterEnv: ["@testing-library/jest-dom"],
  moduleNameMapper: {
    "\\.(svg)$": "jest-svg-transformer",
    "\\.(css|scss)$": "identity-obj-proxy",
  },
};
