/**
 * @jest-environment jsdom
 */
const knob = require("../../../src/ui/controls/knob")
const {TEST_DOMAIN} = require("../uiTestBootstrap");

document.body.innerHTML =
    '<div>' +
    '<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">' +
    '  <g id="tuneKnob1">' +
    '       <text x="5" y="16" transform="scale(2, 2)">Hello World!</text>' +
    '  </g>' +
    '</svg>' +
    '</div>';

const createBubbledEvent = (type, props = {}) => {
    const event = new Event(type, { bubbles: true });
    Object.assign(event, props);
    return event;
};

test('can wire knob', () => {
    let callbackExecuted = false
    knob.wire(TEST_DOMAIN,"tune", 1, () => {
        callbackExecuted = true
    })
    let node = document.querySelector("#tuneKnob1")
    node.dispatchEvent(
        createBubbledEvent("mousedown", { clientX: 0, clientY: 0 })
    );
    expect(callbackExecuted).toBe(true)
})


