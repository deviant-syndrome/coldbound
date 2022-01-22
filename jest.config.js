const config = {
    transform: {
        "^.+\\.jsx?$": "babel-jest"
    },
    moduleNameMapper: {
        "d3": "<rootDir>/node_modules/d3/dist/d3.min.js"
    },
    moduleDirectories: [
        "node_modules"
    ],
    testResultsProcessor: "jest-sonar-reporter",
    "collectCoverage": true
}

module.exports = config;