const TRANSPORT_STOPPED = 0
const TRANSPORT_RUNNING = 1

const MIDI_TRANSPORT_START = 0xFA
const MIDI_PPQ_TICK = 0xF8

const PPQ12 = 12
const PPQ24 = 24
const PPQ = 1

const AV_G = [PPQ12, PPQ24, PPQ]

let state = TRANSPORT_STOPPED


let ppqTickListeners = {}
let ppqCounters = {}

AV_G.forEach(k => {
    ppqTickListeners[k] = []
    ppqCounters[k] = 0
})

function handlePPQCounter(granularity) {
    ppqCounters[granularity] = ppqCounters[granularity] + 1
    if (ppqCounters[granularity] === granularity) {
        ppqCounters[granularity] = 0
        ppqTickListeners[granularity].forEach(cb => cb())
    }
}

function handlePPQCounters() {
    AV_G.forEach(k => handlePPQCounter(k))
}

function isRunning() {
    return state === TRANSPORT_RUNNING
}

function addPPQTickListener(granularity, cb) {
    ppqTickListeners[granularity].push(cb)
}

function handleTransport(event) {
    if (event.data[0] === MIDI_TRANSPORT_START) {
        state = TRANSPORT_RUNNING
        return
    }

    if (isRunning()) {
        if (event.data[0] === MIDI_PPQ_TICK) {
            handlePPQCounters()
        }
    }
}

export { addPPQTickListener, handleTransport, PPQ, PPQ24, PPQ12, MIDI_TRANSPORT_START, MIDI_PPQ_TICK }
