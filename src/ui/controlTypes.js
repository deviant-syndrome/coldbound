const SLIDER = "slider"
const KNOB = "Knob"
const BEAM = "Beam"
const TOGGLE = "" // todo: fixme

function slider(index) {
    return `#${SLIDER}${index}`
}

function sliderHead(index) {
    return `${slider(index)}-head`
}

function knob(type, index) {
    return `#${type}${KNOB}${index}`
}

function beam(type, index) {
    return `#${type}${BEAM}${index}`
}

function step(index) {

}

export {
    slider,
    sliderHead,
    knob,
    beam,
}