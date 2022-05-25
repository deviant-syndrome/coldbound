import {
  addTransport,
  CRUISE_CONTROL_MESSAGE,
  menu,
} from "../../src/drumcomputer/menu";
import { patternUp } from "../../src/drumcomputer/functions/patternSelect";

jest.useFakeTimers();

test("By default, menu is in cruise control mode", () => {
  let messages = [];
  addTransport({
    send: (t) => {
      messages.push(t);
    },
  });
  expect(messages[0]).toStrictEqual(CRUISE_CONTROL_MESSAGE);
});

test("When pattern change, the hint is displayed", () => {
  let messages = [];
  addTransport({
    send: (t) => {
      messages.push(t);
    },
  });
  patternUp();
  jest.runAllTimers();
  expect(messages[1]).toStrictEqual("P:1");
  expect(messages[2]).toStrictEqual(CRUISE_CONTROL_MESSAGE);
});
