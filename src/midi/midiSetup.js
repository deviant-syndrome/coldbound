import { requestMIDIAccess } from "./midiProvider";
import {handleTransport} from "./midiTransport";

requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);

function onMIDISuccess(midiAccess) {
  let inputs = midiAccess.inputs;

  for (let input of inputs.values()) {
    input.onmidimessage = (event) => {
      handleTransport(event)
    };
  }
}

function onMIDIFailure() {
  console.log("Could not access your MIDI devices.");
}
