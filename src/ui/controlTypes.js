import { idSelector } from "../dom";

const SLIDER = "slider";
const KNOB = "Knob";
const BEAM = "Beam";
const TOGGLE = ""; // todo: fixme
const BUTTON = "btn";

function slider(index) {
  return idSelector(`${SLIDER}${index}`);
}

function sliderHead(index) {
  return `${slider(index)}-head`;
}

function knob(type, index) {
  return idSelector(`${type}${KNOB}${index}`);
}

function beam(type, index) {
  return idSelector(`${type}${BEAM}${index}`);
}

function toggle(type, index) {
  return idSelector(`${type}${TOGGLE}${index}`);
}

function button(func) {
  return idSelector(`${BUTTON}${func}`);
}

export { slider, sliderHead, knob, beam, toggle, button };
