/**
 * @jest-environment jsdom
 */

const toggle = require("../../../src/ui/controls/toggle")
const {STEP} = require("../../../src/ui/controlAreas");
const {TEST_DOMAIN} = require("../uiTestBootstrap");

document.body.innerHTML =
    '<div id="step1">' +
    '   <div>Hello</div>' +
    '</div>';

const createBubbledEvent = (type, props = {}) => {
    const event = new Event(type, { bubbles: true });
    Object.assign(event, props);
    return event;
};

test('can wire toggle', () => {
    let callbackExecuted = false

    toggle.wire(TEST_DOMAIN, STEP, 1, () => {
        callbackExecuted = true
    })

    let node = document.querySelector("#step1")
    let child = document.querySelector("#step1 > div")

    node.dispatchEvent(
        createBubbledEvent("click", { })
    );
    let styleToggled = child.classList.contains('toggle-on')
    expect(callbackExecuted).toBe(true)
    expect(styleToggled).toBe(true)
})
