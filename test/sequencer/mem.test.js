const mem = require("../../src/sequencer/mem");
const { get } = require("../../src/sequencer/mem");

test("memory is clear when imported", () => {
  let allOff = true;
  for (let i = 0; i < 64; i++) {
    for (let j = 0; j < 16; j++) {
      allOff = !mem.get(i, j);
    }
  }
  expect(allOff).toBe(true);
});

test("can set memory", () => {
  mem.set(0, 0, 1);
  expect(get(0, 0)).toBe(1);
});
