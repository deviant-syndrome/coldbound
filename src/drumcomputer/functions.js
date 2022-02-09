import {getCurrentPattern, setCurrentPattern} from "../sequencer/transport";

let patterChangeListeners = []

function addPatternChangeListener(cb) {
    patterChangeListeners.push(cb)
}

function resetAll() {

}

function patternUp() {
    let current = getCurrentPattern()
    let newIndex = current + 1
    setCurrentPattern(newIndex)
    patterChangeListeners.forEach(cb => cb(newIndex))
}

function patternDown() {
    let current = getCurrentPattern()
    let newIndex = current - 1
    setCurrentPattern(newIndex)
    patterChangeListeners.forEach(cb => cb(newIndex))
}

export {
    patternUp,
    patternDown,
    addPatternChangeListener
}