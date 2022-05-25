import * as mem from "./mem";
import * as binUtils from "./bitUtils";
import * as transport from "./transport";

let stepListeners = [];

function clearAll() {
  mem.clear();
}

function toggleStep(pattern, step, channel) {
  let value = mem.get(pattern, step);

  let newValue = binUtils.flipBit(value, channel);
  mem.set(pattern, step, newValue);
  return binUtils.testBit(newValue, channel);
}

function fillStepValues(steps, channel) {
  let i = 0;
  steps.forEach((a) => {
    a.refresh(
      binUtils.testBit(mem.get(transport.getCurrentPattern(), i), channel)
    );
    i++;
  });
}

function advanceStep() {
  let nextStep = transport.getNextStep();
  if (nextStep !== undefined) {
    stepListeners.forEach((cb) =>
      cb(transport.getCurrentStep(), binUtils.getSetBitsPositions(nextStep))
    );
  }
}

function addStepListener(ctrl) {
  stepListeners.push(ctrl);
}

const MAX_STEPS = 16;

export {
  addStepListener,
  toggleStep,
  advanceStep,
  clearAll,
  fillStepValues,
  MAX_STEPS,
};
