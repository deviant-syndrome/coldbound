import {toggle} from "../controlTypes";
import {ON, OFF} from "../../conventions";
import {setState, getState} from "../state";

export function wire(domain, type, toggleId, ctrl) {
    let toggleEl = domain.select(toggle(type, toggleId))

    toggleEl.on("click", function () {
        let newState = !getState(toggleEl)
        let postfix = newState ? ON : OFF
        toggleEl.selectChildren().attr("class", `toggle-${postfix}`)
        setState(toggleEl, newState)
        ctrl(false)
    })
}