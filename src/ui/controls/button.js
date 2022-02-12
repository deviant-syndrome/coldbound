import { button } from "../controlTypes";

export function wire(domain, func, ctrl) {
  let keyCode = button(func);
  let buttonEl = domain.select(keyCode);

  buttonEl.attr("class", "button");
  buttonEl.on("click", function () {
    ctrl(keyCode);
  });
}
