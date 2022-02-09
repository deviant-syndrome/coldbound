const d3modules = [
  "d3-scale",
  "d3-selection",
  "d3-array",
  "d3-interpolate",
  "d3-color",
  "d3-format",
  "d3-time",
  "d3-drag",
  "d3-dispatch",
];

let d3ModuleMapping = d3modules
  .map((m) => {
    let kv = {};
    kv[m] = "<rootDir>/node_modules/" + m + "/dist/" + m + ".min.js";
    return kv;
  })
  .reduce((l, r) => {
    return {
      ...l,
      ...r,
    };
  });

const config = {
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
  moduleNameMapper: {
    ...d3ModuleMapping,
    osc: "<rootDir>/node_modules/osc/dist/osc-browser.js",
  },
  moduleDirectories: ["node_modules"],
  testResultsProcessor: "jest-sonar-reporter",
  collectCoverage: true,
};

module.exports = config;
