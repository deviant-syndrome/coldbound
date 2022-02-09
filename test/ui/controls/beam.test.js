/**
 * @jest-environment jsdom
 */

const beam = require("../../../src/ui/controls/beam")
const {TEST_DOMAIN} = require("../uiTestBootstrap");

jest.useFakeTimers();

document.body.innerHTML =
    '<div id="stepBeam1">' +
    '</div>';

test('can wire beam and it blinks', () => {
    beam.wire(TEST_DOMAIN,"step", 1).blink()

    let b = document.querySelector("#stepBeam1")

    let classIsSet = cls => { return b.classList.contains(cls) }

    expect(classIsSet("beam-on")).toBe(true)

    jest.runAllTimers();

    expect(classIsSet("beam-on")).toBe(false)
    expect(classIsSet("beam-off")).toBe(true)
})