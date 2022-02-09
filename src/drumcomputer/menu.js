
// Sections
//  Dashboard / Cruise Control
//  Main menu
//      Pattern
//      Exit

const CRUISE_CONTROL = 0
const MAIN_MENU = 1

const EXCLUSIVE = true
const NON_EXCLUSIVE = false

let state = CRUISE_CONTROL

let logic = {}

logic[CRUISE_CONTROL] = _ => {
    return NON_EXCLUSIVE
}

function hint(message) {

}

function menu(keyCode) {
   return logic[state](keyCode)
}

export {
    EXCLUSIVE,
    NON_EXCLUSIVE,
    menu
}