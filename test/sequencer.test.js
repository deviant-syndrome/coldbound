const seq = require("../src/sequencer")

test('sequencer can advance a step', () => {
    let step = 0;
    seq.addStepListener(_ => step = step + 1)
    seq.advanceStep();
    expect(step).toBe(1);
});

test('sequencer initial step is 1', () => { // todo: should be 0?
    let step = 0;
    seq.addStepListener((stepNum, _) => step = stepNum)
    seq.advanceStep();
    expect(step).toBe(2)
})

test('sequencer maximum step is 16', () => { // todo: should be 0?
    let step = 0
    seq.addStepListener((stepNum, _) => step = stepNum)

    for (let i = 0; i < seq.MAX_STEPS - 1; i++) {
        seq.advanceStep();
    }
    expect(step).toBe(1)
})