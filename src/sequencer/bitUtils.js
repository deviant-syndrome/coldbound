function setBits(value, bitPositions) {
  let result = value;
  bitPositions.forEach((bitPos) => {
    result = result ^ (2 ** bitPos);
  });
  return result;
}

function flipBit(value, bitNum) {
  let mask = 1 << bitNum;
  return value ^ mask;
}

function testBit(value, bitNum) {
  let mask = 1 << bitNum;
  return (value & mask) !== 0;
}

function getSetBitsPositions(value) {
  let my_char = value;
  let what_bit_i_am_testing = 0;

  let setBitsResult = [];
  while (what_bit_i_am_testing < 8) {
    if (my_char & 0x01) {
      setBitsResult.push(what_bit_i_am_testing);
    }
    what_bit_i_am_testing++;
    my_char = my_char >> 1;
  }
  return setBitsResult;
}

export { setBits, flipBit, testBit, getSetBitsPositions };
