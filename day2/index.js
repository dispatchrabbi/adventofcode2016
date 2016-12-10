const readFileAndReport = require('../shared/readFileAndReport.js');

const DIRECTIONS = {
  U: {x: 0, y: 1},
  D: {x: 0, y: -1},
  L: {x: -1, y: 0},
  R: {x: 1, y: 0},
};
const clamp = function(val) { return Math.max(Math.min(val, 1), -1); };
const determineNextNumber = function(initialKey, instructions) {
  return instructions.split('').reduce(function(key, instruction) {
    return {
      x: clamp(key.x + DIRECTIONS[instruction].x),
      y: clamp(key.y + DIRECTIONS[instruction].y)
    };
  }, initialKey);
};

const KEYS = [
  { number: 1, x: -1, y:  1 },   { number: 2, x: 0, y:  1 },   { number: 3, x: 1, y:  1 },
  { number: 4, x: -1, y:  0 },   { number: 5, x: 0, y:  0 },   { number: 6, x: 1, y:  0 },
  { number: 7, x: -1, y: -1 },   { number: 8, x: 0, y: -1 },   { number: 9, x: 1, y: -1 },
];
function whichKey(x, y) {
  for(let key of KEYS) {
    if(key.x === x && key.y === y) {
      return key.number;
    }
  }
};

readFileAndReport(function(input) {
  const INITIAL_KEY = { x: 0, y: 0 };
  const code = [];
  const sequences = input.split('\n').slice(0, -1);
  sequences.reduce(function(lastKey, sequence) {
    const nextKey = determineNextNumber(lastKey, sequence);
    code.push(whichKey(nextKey.x, nextKey.y));
    return nextKey;
  }, INITIAL_KEY);

  return `The code is: ${code.join(' ')}`;
});
