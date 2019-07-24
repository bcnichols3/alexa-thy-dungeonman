// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  roots: ["<rootDir>/src"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  clearMocks: true,
  testEnvironment: "node",
  moduleDirectories: ["src", "node_modules"],
  moduleFileExtensions: ["js", "ts"],
};
