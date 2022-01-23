/**
 * @jest-environment jsdom
 */
const slider = require("../../../src/ui/controls/slider")
const d3 = require("d3");

SVGElement.prototype.getBBox = jest.fn(() => {
    return {
        x: 0,
        y: 0,
        width: 42,
        height: 42
    }
})

document.body.innerHTML =
    '<div>' +
    '<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">' +
    '  <g id="slider1">' +
    '       <text x="5" y="16" transform="scale(2, 2)">Hello World!</text>' +
    '       <rect id="slider1-head"></rect>' +
    '  </g>' +
    '</svg>' +
    '</div>';


jest.mock('d3', () => {

    let wrappedD3 = jest.requireActual('d3');

    var d3Mock = {
        drag: undefined,
        event: wrappedD3.event,
        select: wrappedD3.select,
        scaleLinear: wrappedD3.scaleLinear,
        __passedEventHandlers: []
    };

    d3Mock.drag = () => {
        let dragMock = {
            apply: () => {}
        };
        dragMock.on = (event, eventHandler) => {
            d3Mock.__passedEventHandlers.push(eventHandler);
            return dragMock;
        }
        return dragMock;
    };

    return d3Mock;

});

test('can wire slider', () => {
   let callbackExecuted = false
   slider.wire(1, () => { callbackExecuted = true })
   let dragStartedHandler = d3.__passedEventHandlers[1];
   dragStartedHandler({ y: 42 });
   expect(callbackExecuted).toBe(true)
})