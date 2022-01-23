const SLIDER = "slider"
const TUNE = "tune"
const KNOB = "Knob"
const STEP_TOGGLE = ""
const BEAM = "beam"

function slider(index) {
    return `#${SLIDER}${index}`
}

function sliderHead(index) {
    return `${slider(index)}-head`
}

function knob(type, index) {
    return `#${type}${KNOB}${index}`
}

export {
    slider,
    sliderHead,
    knob,
    TUNE
}