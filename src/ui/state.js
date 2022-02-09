import {local} from "d3-selection";

let state = local()

function setState(control, value) {
    state.set(control, value)
}

function getState(control) {
    return state.get(control)
}

export {
    setState,
    getState
}