import * as svgKnob from "svg-knob";
import * as d3 from 'd3'
import * as ct from '../controlTypes'

function wire(type, index, ctrl) {
    let knobSel = ct.knob(type, index)

    let knobBBox = d3.select(knobSel)
        .node()
        .getBBox()

    let radius = knobBBox.width * 0.5

    return new svgKnob.default(knobSel, {
        bg_radius: radius * 0.8,
        track_bg_radius: radius,
        track_radius: radius,
        cursor_radius: 2,
        cursor_width: 0.5,
        cursor_length: 1.2,
        markers_radius: radius * 1.1,
        bg: false,
        track_width: 0.5,
        track: true,
        track_bg: false,
        cursor: true,
        value_text: false,
        markers_length: 1,
        markers_width: 0.2,
        markers: 0,
        initial_value: 42,
        onchange: (v) => {
            ctrl(v)
        }
    });
}

export { wire }