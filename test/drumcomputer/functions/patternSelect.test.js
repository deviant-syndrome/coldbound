import {
  addPatternChangeListener,
  patternDown,
  patternUp,
} from "../../../src/drumcomputer/functions/patternSelect";
import { getCurrentPattern } from "../../../src/sequencer/transport";
const editor = require("../../../src/sequencer/editor");
const transport = require("../../../src/sequencer/transport");

beforeEach(() => {
  transport.resetState();
  editor.clearAll();
});

test("can navigate to the next pattern", () => {
  patternUp();
  expect(getCurrentPattern()).toBe(1);
});

test("can navigate to the previous pattern", () => {
  patternUp();
  patternDown();
  expect(getCurrentPattern()).toBe(0);
});

test("can attach a pattern change listener", () => {
  let callbackExecuted = false;
  addPatternChangeListener(() => {
    callbackExecuted = true;
  });

  patternUp();

  expect(callbackExecuted).toBe(true);
});
