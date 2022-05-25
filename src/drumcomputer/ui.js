import * as wire from "./wire";
import {
  addStepListener,
  fillStepValues,
  toggleStep,
} from "../sequencer/editor";
import * as areas from "../ui/controlAreas";
import { keyScan } from "./keys";
import { addPatternChangeListener } from "./functions/patternSelect";
import { send } from "../osc/oscTransport";
import { trigger } from "../osc/oscCommandBuilders";
import { addTransport } from "./menu";
import { getCurrentPattern } from "../sequencer/transport";

let stepBeams = [];
let steps = [];
let readOut = undefined;
let currentChannel = 0;

function init() {
  wireSteps();
  wireStepBeams();
  wireKnobs();
  wireSliders();
  wireLed();
  wireButtons();
  wireChannelSelectors();

  addPatternChangeListener((p) => {
    fillStepValues(steps, currentChannel);
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
    steps.push(
      wire.wireToggle(`step`, i, (w) => {
        return toggleStep(getCurrentPattern(), i - 1, currentChannel);
      })
    );
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

function wireChannelSelectors() {
  wire.wireToggle(
    "channelToggle",
    1,
    () => {
      currentChannel = 0;
      fillStepValues(steps, currentChannel);
      return true;
    },
    true
  );
  wire.wireToggle(
    "channelToggle",
    2,
    () => {
      currentChannel = 1;
      fillStepValues(steps, currentChannel);
      return true;
    },
    true
  );
}

function wireLed() {
  readOut = wire.wireReadout();
  addTransport({
    send: (t) => {
      readOut.clear();
      readOut.stopScrolling();
      if (t.length > 5) {
        readOut.sendScrollingText(t);
      } else {
        readOut.sendText(t);
      }
    },
  });
}

export { init };
