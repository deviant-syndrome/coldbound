import * as mem from "./mem"
import * as binUtils from "./bitUtils"
import * as transport from "./transport"

let stepListeners = []

function clearAll() {
    mem.clear()
}

function toggleStep(pattern, step, channel)
{
    let value = mem.get(pattern, step)
    let newValue = binUtils.setBits(value, [channel])
    mem.set(pattern, step, newValue)
}

function advanceStep()
{
    let nextStep = transport.getNextStep();
    if (nextStep !== undefined) {
        stepListeners.forEach(cb => cb(transport.getCurrentStep(),
            binUtils.getSetBitsPositions(nextStep)))
    }
}

function addStepListener(ctrl)
{
    stepListeners.push(ctrl)
}

const MAX_STEPS = 16

export { addStepListener, toggleStep, advanceStep, clearAll, MAX_STEPS }

