/**
 * @jest-environment jsdom
 */

const fs = require("fs");
const path = require("path");
const drumcomputer = require("../../src/drumcomputer/drumcomputer");

let root = path.resolve(__dirname, "../..");
let knobs = fs
  .readFileSync(root + "/images/sliced/controls/004_knobs.svg")
  .toString();
let mainUI = fs
  .readFileSync(root + "/images/sliced/controls/003_Unsorted_UI.svg")
  .toString();

document.body.innerHTML =
  "<div id='drumcomputer'>" +
  knobs.replace('<?xml version="1.0" encoding="UTF-8" standalone="no"?>', "") +
  mainUI.replace('<?xml version="1.0" encoding="UTF-8" standalone="no"?>', "") +
  "</div>";

jest.mock("../../src/midi/midiProvider", () => {
  return {
    requestMIDIAccess: (_) => {
      return Promise.resolve({
        inputs: {
          values: (_) => {
            return [{}];
          },
        },
      });
    },
  };
});

jest.mock("../../src/ui/d3DomainImpl", () => {
  let wrappedProvider = jest.requireActual("../../src/ui/d3DomainImpl");
  return {
    getDomainAgnosticImplementation:
      wrappedProvider.getDomainAgnosticImplementation,
    getImplementation: wrappedProvider.getImplementation,
    getElementAccessSupport: wrappedProvider.getNoElementAccessSupport,
    getDragSupport: wrappedProvider.getDragSupport,
  };
});

SVGElement.prototype.getBBox = jest.fn(() => {
  return {
    x: 1,
    y: 1,
    width: 42,
    height: 42,
  };
});

test("Drum computer passes POST", () => {
  drumcomputer.init();
  expect(knobs.length > 0).toBe(true);
});
