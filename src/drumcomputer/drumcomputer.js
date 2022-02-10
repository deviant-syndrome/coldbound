import * as ui from "./ui";
import * as seq from "../sequencer/editor";
import { addPPQTickListener, PPQ12 } from "../midi/midiTransport";

function init() {
  addPPQTickListener(PPQ12, seq.advanceStep);
  ui.init();
}

export { init };
