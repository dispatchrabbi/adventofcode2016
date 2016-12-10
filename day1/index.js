const readFileAndReport = require('../shared/readFileAndReport.js');

const DIRECTIONS = {
  L: -90,
  R: 90
};
const turn = function(initialOrientation, direction) {
  let orientation = initialOrientation + DIRECTIONS[direction];
  while(orientation < 0) { orientation += 360; }
  orientation %= 360;

  return orientation;
};

const ORIENTATIONS = {
  NORTH: 0,
  EAST: 90,
  SOUTH: 180,
  WEST: 270,
};
const walk = function(initialPosition, distance) {
  let x = initialPosition.x;
  let y = initialPosition.y;

  switch(initialPosition.orientation) {
    case ORIENTATIONS.NORTH:
      y += distance;
      break;
    case ORIENTATIONS.SOUTH:
      y -= distance;
      break;
    case ORIENTATIONS.EAST:
      x += distance;
      break;
    case ORIENTATIONS.WEST:
      x -= distance;
      break;
  }

  return {
    orientation: initialPosition.orientation,
    x,
    y,
  };
};

const INITAL_POSITION = {
  orientation: 0,
  x: 0,
  y: 0,
};
const followInstructions = function(initialPosition, instructions) {
  return instructions.reduce(function(position, instruction) {
    const turnDirection = instruction.substr(0, 1);
    const distance = +(instruction.substr(1));

    return walk({
      orientation: turn(position.orientation, turnDirection),
      x: position.x,
      y: position.y,
    }, distance);
  }, initialPosition);
};

readFileAndReport(function(input) {
  const instructions = input.split(', ');
  const finalPosition = followInstructions(INITAL_POSITION, instructions);

  return (
    `Following these instructions, you end up ` +
    `${Math.abs(finalPosition.y)} blocks ${finalPosition.y < 0 ? 'south' : 'north'} and ` +
    `${Math.abs(finalPosition.x)} blocks ${finalPosition.x < 0 ? 'west' : 'east'} of your initial position, ` +
    `or ${Math.abs(finalPosition.x) + Math.abs(finalPosition.y)} blocks away.`
  );
});
