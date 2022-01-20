let state = {
    position: 1,
    pattern: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    stepListeners: []
}

function toggleStep(stepIndex)
{
    state.pattern[stepIndex] = !state.pattern[stepIndex]
}

function advanceStep()
{
    state.stepListeners.forEach(cb => cb(state.position, state.pattern[state.position - 1]))
    if (state.position < 16) {
        state.position++
    } else state.position = 1
}

function addStepListener(ctrl)
{
    state.stepListeners.push(ctrl)
}

const MAX_STEPS = 16

export { addStepListener, toggleStep, advanceStep, MAX_STEPS }

