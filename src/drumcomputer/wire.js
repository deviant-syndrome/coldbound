import { LEDEncoder } from "led-bus";
import * as slider from "../ui/controls/slider";
import * as knob from "../ui/controls/knob";
import * as beam from "../ui/controls/beam";
import * as toggle from "../ui/controls/toggle";
import { getDomain } from "../ui/domainProvider";

const domain = getDomain("#drumcomputer");

function wireReadout() {
  return new LEDEncoder(
    5,
    (displayNum, segmentCode, on) => {
      let svgEl = domain.select(`#led${displayNum + 1}_${segmentCode}`);
      if (on) {
        svgEl.attr("class", "glowing-led").attr("style", "fill:red;");
      } else {
        svgEl.attr("style", "fill:#6f0000;").attr("class", null);
      }
    },
    {
      decimalPointSupport: false,
    }
  );
}

let wireSlider = slider.wire.bind(null, domain);
let wireKnob = knob.wire.bind(null, domain);
let wireBeam = beam.wire.bind(null, domain);
let wireToggle = toggle.wire.bind(null, domain);

export { wireSlider, wireToggle, wireBeam, wireKnob, wireReadout };
