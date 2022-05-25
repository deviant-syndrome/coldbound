/**
 * @jest-environment jsdom
 */

const toggle = require("../../../src/ui/controls/toggle");
const { STEP } = require("../../../src/ui/controlAreas");
const { TEST_DOMAIN } = require("../uiTestBootstrap");

document.body.innerHTML =
  '<div id="step1">' +
  '  <div class="foo">Hello</div>' +
  "</div>" +
  '<div id="step2">' +
  '  <div class="fo2">World</div>' +
  "</div>";

const createBubbledEvent = (type, props = {}) => {
  const event = new Event(type, { bubbles: true });
  Object.assign(event, props);
  return event;
};

test("can wire toggle", () => {
  let callbackExecuted = false;

  toggle.wire(TEST_DOMAIN, STEP, 1, () => {
    callbackExecuted = true;
    return true;
  });

  let node = document.querySelector("#step1");
  let child = document.querySelector(".foo");

  node.dispatchEvent(createBubbledEvent("click", {}));

  let styleToggled = child.classList.contains("toggle-on");
  expect(callbackExecuted).toBe(true);
  expect(styleToggled).toBe(true);
});

test("can wire toggle in exclusive mode", () => {
  toggle.wire(
    TEST_DOMAIN,
    STEP,
    1,
    () => {
      return true;
    },
    true
  );

  let node = document.querySelector("#step1");

  let child = document.querySelector(".fo2");
  let child2 = document.querySelector(".foo");

  node.dispatchEvent(createBubbledEvent("click", {}));

  let styleToggled =
    child.classList.contains("toggle-off") &&
    child2.classList.contains("toggle-on");
  expect(styleToggled).toBe(true);
});
