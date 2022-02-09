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

function getStandardElementAccessSupport(selection) {
  return selection.node();
}

function getElementAccessSupport(selection) {
  return getStandardElementAccessSupport(selection);
}

function getDragSupport() {
  return d3importer.drag();
}

function getNoElementAccessSupport() {
  return {
    getBBox: (_) => {
      return {
        x: 1,
        y: 1,
        width: 42,
        height: 42,
      };
    },
    nodeName: "g",
  };
}

//
// get logic of retrieving SVG nodes

export {
  getImplementation,
  getDomainAgnosticImplementation,
  getElementAccessSupport,
  getNoElementAccessSupport,
  getDragSupport,
};
