const binUtils = require("../../src/sequencer/bitUtils")

test('can set bits', () => {
    let bitsSet = binUtils.setBits(0, [4])
    expect(binUtils.getSetBitsPositions(bitsSet)).toStrictEqual([4])
})