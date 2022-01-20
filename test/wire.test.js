/**
 * @jest-environment jsdom
 */
const wire = require("../src/wire")

SVGElement.prototype.getBBox = jest.fn(() => {
    return {
        x: 0,
        y: 0,
        width: 42,
        height: 42
    }
})

SVGElement.prototype.addEventListener = jest.fn(() => {
    console.info("HECK HECK");
})

jest.mock('d3', ()=>{

    let wrappedD3 = jest.requireActual('d3');

    var d3Mock = {
        drag: undefined,
        event: wrappedD3.event,
        select: wrappedD3.select,
        __passedEventHandlers: []
    };

    d3Mock.drag = ()=>{
        let dragMock = {
            apply: ()=>{}
        };
        dragMock.on = (event, eventHandler)=>{
            d3Mock.__passedEventHandlers.push(eventHandler);
            return dragMock;
        }
        return dragMock;
    };

    return d3Mock;

});

document.body.innerHTML =
    '<div>' +
    '<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">' +
    '  <g id="slider1">' +
    '       <text x="5" y="16" transform="scale(2, 2)">Hello World!</text>' +
    '       <rect id="slider1-head"></rect>' +
    '  </g>' +
    '</svg>' +
    '</div>';

test('can wire slider', () => {
    wire.wireSlider("slider1", () => {})
    const types = []
    for (let ev in window) {
        if (/^on/.test(ev)) types[types.length] = ev;
    }


    let elements = []

    let currentElement = window//.querySelector("#slider1-head")
    for (let j = 0; j < types.length; j++) {
        if (typeof currentElement[types[j]] === 'function') {
            elements.push({
                "node": currentElement,
                "type": types[j],
                "func": currentElement[types[j]].toString(),
            });
        }
    }
    console.info(elements)
});

it('enableDragAndDrop', ()=>{
    let element = document.createElement('svg');
    document.body.appendChild(element);

    let svgSelection = d3.select(element);

    sut.enableDragAndDrop(svgSelection);

    spyOn(sut, '__dragStarted');
    let dragStartedHandler = d3.__passedEventHandlers[0];
    dragStartedHandler();
    expect(sut.__dragStarted).toHaveBeenCalled();

    spyOn(sut, '__dragged');
    let draggedHandler = d3.__passedEventHandlers[1];
    draggedHandler();
    expect(sut.__dragged).toHaveBeenCalled();

});