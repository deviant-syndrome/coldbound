const config = {
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
  moduleNameMapper: {
    "d3-scale": "<rootDir>/node_modules/d3-scale/dist/d3-scale.min.js",
    "d3-selection":
      "<rootDir>/node_modules/d3-selection/dist/d3-selection.min.js",
    "d3-array": "<rootDir>/node_modules/d3-array/dist/d3-array.min.js",
    "d3-interpolate":
      "<rootDir>/node_modules/d3-interpolate/dist/d3-interpolate.min.js",
    "d3-color": "<rootDir>/node_modules/d3-color/dist/d3-color.min.js",
    "d3-format": "<rootDir>/node_modules/d3-format/dist/d3-format.min.js",
    "d3-time": "<rootDir>/node_modules/d3-time/dist/d3-time.min.js",
    "d3-drag": "<rootDir>/node_modules/d3-drag/dist/d3-drag.min.js",
    "d3-dispatch": "<rootDir>/node_modules/d3-dispatch/dist/d3-dispatch.min.js",
  },
  moduleDirectories: ["node_modules"],
  testResultsProcessor: "jest-sonar-reporter",
  collectCoverage: true,
};

module.exports = config;
