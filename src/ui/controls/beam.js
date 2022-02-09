import * as ct from "../controlTypes";

export function wire(domain, type, index) {
  let beam = domain.select(ct.beam(type, index));
  return {
    blink: () => {
      beam.attr("class", "beam-on");
      setTimeout(() => {
        beam.attr("class", "beam-off");
      }, 200);
    },
  };
}
