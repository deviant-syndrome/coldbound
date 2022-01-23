import * as d3 from "d3";
import * as ct from '../controlTypes'

let svg = d3.select("body > div > svg")

function wire(index, ctrl) {
    let sliderSel = ct.slider(index)
    let sliderHeadSel = ct.sliderHead(index)

    let height = d3.select(sliderSel)
        .node()
        .getBBox().height * 0.85;

    let offsetY = d3.select(sliderHeadSel)
        .node()
        .getBBox().y

    let scale = d3.scaleLinear()
        .domain([offsetY, offsetY + parseInt(height)])
        .range([0, height])
        .clamp(true);

    let slide = (el, y) => {
        el.attr("transform", "translate(0," + scale(y) + ")");
        ctrl(scale.invert(y));
    }

    let handle = svg.select(sliderHeadSel)
        .attr("class", "handle")
        .call(d3.drag()
            .on("start.interrupt", function () {
                handle.interrupt();
            })
            .on("drag", function (event) {
                slide(handle, event.y)
            }));
}

export { wire }
