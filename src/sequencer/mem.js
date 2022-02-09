const MAX_PATTERNS = 64;

let state = {
  patterns: [],
};

function clear() {
  for (let i = 0; i < MAX_PATTERNS; i++) {
    state.patterns[i] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  }
}

function get(pattern, step) {
  return state.patterns[pattern][step];
}

function set(pattern, step, val) {
  state.patterns[pattern][step] = val;
}

function getChannelPattern(pattern, channel) {
  return state.patterns[pattern].map((val) => val ^ (2 ** channel));
}

clear();

export { get, set, getChannelPattern, clear };
