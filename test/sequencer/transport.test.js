const transport = require("../../src/sequencer/transport");
const editor = require("../../src/sequencer/editor");

beforeEach(() => {
  transport.resetState();
  editor.clearAll();
});

function advanceOnePatternInSongMode() {
  editor.toggleStep(0, 0, 0);
  editor.toggleStep(1, 0, 1);

  transport.setTransportMode(transport.TRANSPORT_MODE_SONG);

  for (let i = 0; i < 16; i++) {
    transport.getNextStep();
  }
}

test("transport can transport", () => {
  editor.toggleStep(0, 0, 0);
  expect(transport.getNextStep()).toBe(1);
});

test("can turn off transport", () => {
  editor.toggleStep(0, 0, 0);
  transport.toggleTransport();
  expect(transport.getNextStep()).toBe(undefined);
});

test("toggle transport function works like a toggle", () => {
  editor.toggleStep(0, 0, 0);
  transport.toggleTransport();
  transport.toggleTransport();
  expect(transport.getNextStep()).toBe(1);
});

test("transport is in loop mode by default", () => {
  editor.toggleStep(0, 0, 0);
  editor.toggleStep(1, 0, 1);

  for (let i = 0; i < 16; i++) {
    transport.getNextStep();
  }
  expect(transport.getNextStep()).toBe(1);
});

test("can switch to song mode", () => {
  advanceOnePatternInSongMode();

  expect(transport.getNextStep()).toBe(2);
});

test("can switch to stutter mode", () => {
  editor.toggleStep(0, 0, 0);
  transport.setTransportMode(transport.TRANSPORT_MODE_STUTTER);
  transport.getNextStep();

  expect(transport.getNextStep()).toBe(1);
});

test("can reset transport", () => {
  advanceOnePatternInSongMode();
  transport.resetTransport();
  expect(transport.getNextStep()).toBe(1);
});

test("can reset pattern", () => {
  advanceOnePatternInSongMode();
  transport.getNextStep();
  transport.resetPattern();
  expect(transport.getNextStep()).toBe(2);
});

test("can get current position", () => {
  advanceOnePatternInSongMode();
  transport.getNextStep();
  expect(transport.getCurrentPattern()).toBe(1);
  expect(transport.getCurrentStep()).toBe(1);
});
