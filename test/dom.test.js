import { idSelector } from "../src/dom";

test("can get a valid id selector", () => {
  expect(idSelector("id")).toStrictEqual("#id");
});
