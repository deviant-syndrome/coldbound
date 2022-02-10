const SLIDER = "slider";
const KNOB = "Knob";
const BEAM = "Beam";
const TOGGLE = ""; // todo: fixme
const BUTTON = "btn";

function slider(index) {
  return `#${SLIDER}${index}`;
}

function sliderHead(index) {
  return `${slider(index)}-head`;
}

function knob(type, index) {
  return `#${type}${KNOB}${index}`;
}

function beam(type, index) {
  return `#${type}${BEAM}${index}`;
}

function toggle(type, index) {
  return `#${type}${TOGGLE}${index}`;
}

function button(func) {
  return `#${BUTTON}${func}`;
}

export { slider, sliderHead, knob, beam, toggle, button };
