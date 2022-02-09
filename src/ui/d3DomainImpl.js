import d3importer from "../d3importer";

function getImplementation(selector) {
  return getStandardImplementation(selector);
}

function getStandardImplementation(selector) {
  return d3importer.select(selector);
}

function getDomainAgnosticImplementation() {
  return d3importer;
}

export { getImplementation, getDomainAgnosticImplementation };
