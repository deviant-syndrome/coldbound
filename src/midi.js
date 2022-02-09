import { requestMIDIAccess } from "./midi/midiProvider";

requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);

let midiTickCallbacks = [];

var ppqCount = 11;
var start = false;

function onMIDISuccess(midiAccess) {
  let inputs = midiAccess.inputs;
  let outputs = midiAccess.outputs;

  for (var input of inputs.values()) {
    input.onmidimessage = (event) => {
      handlePPQClock(event);
    };
  }
}

function handlePPQClock(event) {
  // todo: constants instead of hardcode
  if (event.data[0] === 250) {
    console.log("start");
    start = true;
  } else {
    if (start) {
      if (event.data[0] === 248) {
        ppqCount++;
        if (ppqCount > 11) {
          ppqCount = 0;
          midiTickCallbacks.forEach((cb) => cb());
        }
      }
    }
  }
}

function onMIDIFailure() {
  console.log("Could not access your MIDI devices.");
}

function executeCallbacks() {
  midiTickCallbacks.forEach((cb) => cb());
}

export function addMidiTickListener(listener) {
  midiTickCallbacks.push(listener);
}
