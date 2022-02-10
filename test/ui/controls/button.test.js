/**
 * @jest-environment jsdom
 */

const button = require("../../../src/ui/controls/button");
const { TEST_DOMAIN } = require("../uiTestBootstrap");

document.body.innerHTML = '<div id="btnStart">' + "   <div>Hello</div>" + "</div>";

const createBubbledEvent = (type, props = {}) => {
  const event = new Event(type, { bubbles: true });
  Object.assign(event, props);
  return event;
};

test("can wire button", () => {
  let callbackExecuted = false;

  button.wire(TEST_DOMAIN, "Start", () => {
    callbackExecuted = true;
  });

  let node = document.querySelector("#btnStart");

  node.dispatchEvent(createBubbledEvent("click", {}));
  expect(callbackExecuted).toBe(true);
});
