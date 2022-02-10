import { button } from "../ui/controlTypes";
import { patternDown, patternUp } from "./functions/patternSelect";
import { EXCLUSIVE, menu } from "./menu";

let regularKeyMap = {};

regularKeyMap[button("Up")] = patternUp;
regularKeyMap[button("Down")] = patternDown;

export function keyScan(keyCode) {
  if (menu(keyCode) === EXCLUSIVE) {
    return;
  }
  regularKeyMap[keyCode]();
}
