import { getDomain } from "../../src/ui/domainProvider";

SVGElement.prototype.getBBox = jest.fn(() => {
  return {
    x: 1,
    y: 1,
    width: 42,
    height: 42,
  };
});

jest.mock("../../src/ui/d3DomainImpl", () => {
  let wrappedProvider = jest.requireActual("../../src/ui/d3DomainImpl");
  return {
    getDomainAgnosticImplementation:
      wrappedProvider.getDomainAgnosticImplementation,
    getImplementation: wrappedProvider.getDomainAgnosticImplementation,
  };
});

let mockTestMetadata = {
  __passedEventHandlers: [],
};

jest.mock("../../src/d3importer", () => {
  let wrappedD3 = jest.requireActual("../../src/d3importer").default;

  var d3Mock = {
    drag: undefined,
    select: wrappedD3.select,
    scaleLinear: wrappedD3.scaleLinear,
  };

  d3Mock.drag = () => {
    let dragMock = {
      apply: () => {},
    };
    dragMock.on = (event, eventHandler) => {
      mockTestMetadata.__passedEventHandlers.push(eventHandler);
      return dragMock;
    };
    return dragMock;
  };

  return d3Mock;
});

export const TEST_DOMAIN = {
  ...getDomain(),
  ...mockTestMetadata,
};
