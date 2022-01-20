import * as d3 from 'd3'
import * as svgKnob from 'svg-knob'
import {LEDEncoder} from "led-bus";

let svg = d3.select("body > div > svg")
let led = d3.select("#led-screen")

let toggled = d3.local()

function wireSlider(sliderId, ctrl) {
    let slider = svg.select(`#${sliderId}`)
        .attr("class", "slider")

    // let height = document.querySelector(`#${sliderId}`).getBBox().height * 0.85;
    // let offsetY = document.querySelector(`#${sliderId}-head`).getBBox().y

    let height = d3.select(`#${sliderId}`).node().getBBox().height * 0.85;
    let offsetY = d3.select(`#${sliderId}-head`).node().getBBox().y

    let scale = d3.scaleLinear()
        .domain([offsetY, offsetY + parseInt(height)])
        .range([0, height])
        .clamp(true);

    let slide = (el, y) => {
         el.attr("transform", "translate(0," + scale(y) + ")");
    }

    // slider
    //     .call(d3.drag()
    //         .on("start.interrupt", function () {
    //             slider.interrupt();
    //         })
    //         .on("start drag", function (event) {
    //             slide(handle, event.y)
    //             ctrl(scale.invert(event.y));
    //         }));

    let handle = svg.select(`#${sliderId}-head`)
        .attr("class", "handle")
        .call(d3.drag()
            .on("start.interrupt", function () {
                handle.interrupt();
            })
            .on("drag", function (event) {
                slide(handle, event.y)
            }));
}

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

function wireKnob(knobId) {
    let knobBBox = document.querySelector(`#${knobId}`).getBBox()
    let radius = knobBBox.width * 0.5

    svgKnob.default(`#${knobId}`, {
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
            // console.info(v)
        }
    });
}

export { wireSlider, wireToggle, wireBeam, wireKnob, wireReadout }