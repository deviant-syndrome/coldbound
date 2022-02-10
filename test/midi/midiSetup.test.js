import {addPPQTickListener, MIDI_PPQ_TICK, MIDI_TRANSPORT_START, PPQ12} from "../../src/midi/midiTransport";
import "../../src/midi/midiSetup"

let mockMidiInput = {}

jest.mock("../../src/midi/midiProvider", () => {
    return {
        requestMIDIAccess: (_) => {
            return Promise.resolve({
                inputs: {
                    values: (_) => {
                        return [mockMidiInput];
                    },
                },
            });
        },
    };
});

const START_TRANSPORT = {
    data: [MIDI_TRANSPORT_START]
}

const PPQ_TICK = {
    data: [MIDI_PPQ_TICK]
}

test("can add ppq12 listener", () => {
    let callbackExecuted = false
    addPPQTickListener(PPQ12, () => {
        callbackExecuted = true
    })

    mockMidiInput.onmidimessage(START_TRANSPORT)

    for (let i = 0; i <= PPQ12; i++) {
        mockMidiInput.onmidimessage(PPQ_TICK)
    }

    expect(callbackExecuted).toBe(true)
});

