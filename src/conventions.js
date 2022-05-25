const ON = "on";
const OFF = "off";

function getStateClass(stem, state) {
  let postfix = state ? ON : OFF;
  return `${stem}-${postfix}`;
}

export { getStateClass };
