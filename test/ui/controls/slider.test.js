/**
 * @jest-environment jsdom
 */
const slider = require("../../../src/ui/controls/slider");
const { TEST_DOMAIN } = require("../uiTestBootstrap");

SVGElement.prototype.getBBox = jest.fn(() => {
  return {
    x: 0,
    y: 0,
    width: 42,
    height: 42,
  };
});

document.body.innerHTML =
  "<div>" +
  '<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">' +
  '  <g id="slider1">' +
  '       <text x="5" y="16" transform="scale(2, 2)">Hello World!</text>' +
  '       <rect id="slider1-head"></rect>' +
  "  </g>" +
  "</svg>" +
  "</div>"

test("can wire slider", () => {
  let callbackExecuted = false;
  slider.wire(TEST_DOMAIN, 1, () => {
    callbackExecuted = true;
  });
  let dragStartedHandler = TEST_DOMAIN.__passedEventHandlers[1];
  dragStartedHandler({ y: 42 });
  expect(callbackExecuted).toBe(true)
});
