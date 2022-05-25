import { toggle } from "../controlTypes";
import { getStateClass, ON, OFF } from "../../conventions";

const MAX_ELEMENTS_TO_SCAN = 25;

function refresh(toggleEl, state) {
  let stem = "toggle";
  toggleEl
    .selectChildren()
    // .attr("class", getStateClass(stem, state)); // todo: fixme
    .replaceClass(getStateClass(stem, !state), getStateClass(stem, state));
}

function shutdownOtherToggles(domain, type, toggleId) {
  let foundToggleElement = true;
  let idCount = 0;
  while (foundToggleElement && idCount < MAX_ELEMENTS_TO_SCAN) {
    idCount++;
    foundToggleElement = domain.select(toggle(type, idCount));
    if (foundToggleElement && idCount !== toggleId) {
      refresh(foundToggleElement, false);
    }
  }
}

export function wire(domain, type, toggleId, ctrl, isExclusive) {
  let toggleEl = domain.select(toggle(type, toggleId));

  toggleEl.on("click", function () {
    refresh(toggleEl, ctrl());
    if (isExclusive) {
      shutdownOtherToggles(domain, type, toggleId);
    }
  });

  return {
    refresh: (state) => refresh(toggleEl, state),
  };
}
