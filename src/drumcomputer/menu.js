// Sections
//  Dashboard / Cruise Control
//  Main menu
//      Pattern
//      Exit
import { addPatternChangeListener } from "./functions/patternSelect";

const EXCLUSIVE = true;
const NON_EXCLUSIVE = false;

const CRUISE_CONTROL_MESSAGE = "We're going to Hell";

let transports = [];
let stateStack = [cruiseControl];

function head() {
  if (stateStack.length > 0) {
    stateStack[stateStack.length - 1]();
  }
}

addPatternChangeListener((pat) => {
  if (stateStack.length < 2) {
    become((_) => hint(`P:${pat}`));
  } else {
    setMenuText(`P:${pat}`);
  }
});

function setMenuText(msg) {
  transports.forEach((t) => t.send(msg));
}

function cruiseControl(keyCode) {
  setMenuText(CRUISE_CONTROL_MESSAGE);
  return NON_EXCLUSIVE;
}

function become(newState, keyCode) {
  stateStack.push(newState);
  menu(keyCode);
}

function menu(keyCode) {
  head();
  return NON_EXCLUSIVE;
}

function hint(message) {
  setMenuText(message);
  setTimeout(() => {
    if (stateStack.length > 1) {
      stateStack.pop();
    }
    head();
  }, 1000);
  return NON_EXCLUSIVE;
}

function addTransport(transport) {
  transports.push(transport);
  menu();
}

export { EXCLUSIVE, NON_EXCLUSIVE, CRUISE_CONTROL_MESSAGE, menu, addTransport };
