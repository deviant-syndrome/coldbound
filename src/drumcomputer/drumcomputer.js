import * as ui from "./ui";
import { addMidiTickListener } from "../midi";
import * as seq from "../sequencer/editor";

function init() {
  addMidiTickListener(seq.advanceStep);
  ui.init();
}

export { init };
