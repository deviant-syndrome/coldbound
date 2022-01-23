import * as d3 from 'd3'
import {LEDEncoder} from "led-bus";
import * as slider from "./ui/controls/slider";
import * as knob from "./ui/controls/knob"

let led = d3.select("#led-display")

let toggled = d3.local()

function wireToggle(toggleId, ctrl) {
    let toggle = svg.select(`#${toggleId}`)
    toggle.on("click", function () {
        let newState = !toggled.get(toggle)
        let postfix = newState ? 'on' : 'off'
        toggle.selectChildren().attr("class", `toggle-${postfix}`)
        toggled.set(toggle, newState)
        ctrl(false)
    })
}

function wireBeam(beamId) {
    let beam = svg.select(`#${beamId}`)
    return {
        blink: () => {
            // todo: usee proper CSS classes here
            beam.attr("class", "beam")
                .style("fill", "#d35f5f")
            setTimeout(() => {
                beam.attr("class", null)
                    .style("fill", "none")
            }, 200)
        }
    }
}

function wireReadout() {
    return new LEDEncoder(5, (displayNum, segmentCode, on) => {
        let svgEl = led.select(`#led${displayNum + 1}_${segmentCode}`)
        if (on) {
            svgEl.attr("class", "glowing-led")
                .attr("style", "fill:red;")

        } else {
            svgEl.attr("style", "fill:#6f0000;")
                .attr("class", null)
        }
    }, {
        decimalPointSupport: false
    })
}

let wireSlider = slider.wire;
let wireKnob = knob.wire

export { wireSlider, wireToggle, wireBeam, wireKnob, wireReadout }