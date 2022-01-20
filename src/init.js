import * as ui from "./ui"
import { addMidiTickListener } from "./midi"
import * as seq from "./sequencer"
import 'sassy'

function init(win) {
   // init console
   // init midi
   addMidiTickListener(seq.advanceStep)
   ui.init()
}

export { init }