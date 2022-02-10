import * as wire from "./wire";
import { addStepListener, toggleStep } from "../sequencer/editor";
import * as areas from "../ui/controlAreas";
import { keyScan } from "./keys";
import { addPatternChangeListener } from "./functions/patternSelect";
import { send } from "../osc/oscTransport";
import { trigger } from "../osc/oscCommandBuilders";

let stepBeams = [];
let readOut = undefined;

function init() {
  wireSteps();
  wireStepBeams();
  wireKnobs();
  wireSliders();
  wireLed();
  wireButtons();

  addPatternChangeListener((p) => {
    console.info("pattern is ", p);
  });

  addStepListener((pos, toggle) => {
    // todo: ddStepListener(channel, (pos, toggle) =>
    if (toggle) {
      send(trigger("kick"));
    }
  });
}

function wireSteps() {
  for (let i = 1; i <= 16; i++) {
    wire.wireToggle(`step`, i, (w) => {
      toggleStep(i - 1);
    });
  }
}

function wireStepBeams() {
  for (let i = 1; i <= 16; i++) {
    stepBeams.push(wire.wireBeam(areas.STEP, i));
  }
  addStepListener((pos) => {
    stepBeams[pos - 1].blink();
  });
}

function wireButtons() {
  wire.wireButton("Up", keyScan);
  wire.wireButton("Down", keyScan);
}

function wireKnobs() {
  wire.wireKnob("tune", 1, (_) => {});
}

function wireSliders() {
  wire.wireSlider(1, (x) => {});
}

function wireLed() {
  readOut = wire.wireReadout();
  readOut.sendScrollingText("Evil will always find you");
}

export { init };
