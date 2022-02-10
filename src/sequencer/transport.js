import * as mem from "./mem";

const TRANSPORT_MODE_LOOP = 0;
const TRANSPORT_MODE_SONG = 1;
const TRANSPORT_MODE_STUTTER = 2;

const DEFAULT_STATE = Object.freeze({
  transport: true,
  step: 0,
  pattern: 0,
  mode: TRANSPORT_MODE_LOOP,
});

let state = {};

function resetState() {
  state = { ...DEFAULT_STATE };
}

function toggleTransport() {
  state.transport = !state.transport;
}

function resetPattern() {
  state.step = 0;
}

function resetTransport() {
  state.pattern = 0;
  state.step = 0;
}

function setTransportMode(mode) {
  state.mode = mode;
}

function getCurrentStep() {
  return state.step;
}

function getCurrentPattern() {
  return state.pattern;
}

function setCurrentPattern(index) {
  state.pattern = index;
}

function getNextStep() {
  if (!state.transport) {
    return undefined;
  }
  let result = mem.get(state.pattern, state.step);

  // noinspection FallThroughInSwitchStatementJS
  switch (state.mode) {
    case TRANSPORT_MODE_LOOP: {
      loopMode();
      break;
    }
    case TRANSPORT_MODE_SONG: {
      songMode();
      break;
    }
    case TRANSPORT_MODE_STUTTER: {
      // noop
      break;
    }
    default: {
      throw new Error("Invalid transport mode");
    }
  }
  return result;
}

function loopMode() {
  state.step = state.step + 1;
  if (state.step > 15) {
    state.step = 0;
    return true;
  }
  return false;
}

function songMode() {
  if (loopMode()) {
    state.pattern = state.pattern + 1;
  }
  if (state.pattern > 64) {
    state.pattern = 0;
  }
}

resetState();

export {
  getNextStep,
  setTransportMode,
  resetPattern,
  resetTransport,
  resetState,
  toggleTransport,
  getCurrentStep,
  getCurrentPattern,
  setCurrentPattern,
  TRANSPORT_MODE_LOOP,
  TRANSPORT_MODE_SONG,
  TRANSPORT_MODE_STUTTER,
};
