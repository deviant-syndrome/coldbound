import "sassy";
import * as drumcomputer from "./drumcomputer/drumcomputer";
import "./midi/midiProvider";

function init(win) {
  drumcomputer.init(win);
}

export { init };
