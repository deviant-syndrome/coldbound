const editor = require("../../src/sequencer/editor");
const transport = require("../../src/sequencer/transport");

beforeEach(() => {
  transport.resetState();
  editor.clearAll();
});

test("sequencer can advance a step", () => {
  let step = 0;
  editor.addStepListener((_) => (step = step + 1));
  editor.advanceStep();
  expect(step).toBe(1);
});

test("sequencer not advancing if transport is off", () => {
  let step = 0;
  editor.addStepListener((_) => (step = step + 1));
  transport.toggleTransport();
  editor.advanceStep();
  expect(step).toBe(0);
});

test("sequencer initial step index is 0", () => {
  let step = 0;
  editor.addStepListener((stepNum, _) => (step = stepNum));
  editor.advanceStep();
  expect(step).toBe(1);
});

test("sequencer maximum step index is 15", () => {
  let step = 0;
  editor.addStepListener((stepNum, _) => (step = stepNum));

  for (let i = 0; i < editor.MAX_STEPS - 1; i++) {
    editor.advanceStep();
  }
  expect(step).toBe(editor.MAX_STEPS - 1);
});

test("sequencer can set a single channel of a step", () => {
  let toggledChannels = [];
  editor.toggleStep(0, 0, 3);
  editor.addStepListener((_, channels) => (toggledChannels = channels));
  editor.advanceStep();
  expect(toggledChannels).toStrictEqual([3]);
});

test("sequencer toggle function works like a toggle", () => {
  let toggledChannels = [];
  editor.toggleStep(0, 0, 3);
  editor.toggleStep(0, 0, 3);
  editor.addStepListener((_, channels) => (toggledChannels = channels));
  editor.advanceStep();
  expect(toggledChannels).toStrictEqual([]);
});
