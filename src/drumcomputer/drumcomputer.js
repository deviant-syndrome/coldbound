import * as ui from "./ui";
import { addMidiTickListener } from "../midi";
import * as seq from "../sequencer/editor";

function init() {
  addMidiTickListener(seq.advanceStep);
  // here add the HTML element domain
  ui.init();
}

export { init };
