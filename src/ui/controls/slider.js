import * as ct from "../controlTypes";
import d3importer from "../../d3importer";

function wire(domain, index, ctrl) {
  let sliderSel = ct.slider(index);
  let sliderHeadSel = ct.sliderHead(index);

  let height = domain.select(sliderSel).node().getBBox().height * 0.85;

  let offsetY = domain.select(sliderHeadSel).node().getBBox().y;

  let scale = d3importer
    .scaleLinear()
    .domain([offsetY, offsetY + parseInt(height)])
    .range([0, height])
    .clamp(true);

  let slide = (el, y) => {
    el.attr("transform", "translate(0," + scale(y) + ")");
    ctrl(scale.invert(y));
  };

  let handle = domain
    .select(sliderHeadSel)
    .attr("class", "handle")
    .call(
      domain
        .drag()
        .on("start.interrupt", function () {
          handle.interrupt();
        })
        .on("drag", function (event) {
          slide(handle, event.y);
        })
    );
}

export { wire };
