const ROOM_NAME_PATTERN = /^([a-z-]+)-(\d+)\[([a-z]+)\]$/;
const parseRoomName = function(roomName) {
  const result = ROOM_NAME_PATTERN.exec(roomName);
  if(!result) { throw new Error(`The room name ${roomName} does not match the expected pattern!`); }

  return {
    name: result[1],
    sectorId: +result[2],
    checksum: result[3],
  };
};

const countCharacters = function(charArray) {
  return charArray.reduce(function(counts, char) {
    counts[char] = (counts[char] || 0) + 1;
    return counts;
  }, {});
};
const checkRoomName = function(name, checksum) {
  const charCounts = countCharacters(name.replace(/[^a-z]+/g, '').split(''));
  const sorted = Object.keys(charCounts).sort(function(a, b) {
    if(charCounts[a] === charCounts[b]) {
      return a < b ? -1 : 1;
    } else {
      return charCounts[b] - charCounts[a];
    }
  });

  return (sorted.slice(0, 5).join('') === checksum);
};

const readFileAndReport = require('../shared/readFileAndReport.js');
readFileAndReport(function(input) {
  const roomNames = input.split('\n').slice(0, -1);
  const sectorIdSum = roomNames.reduce(function(partialSectorIdSum, roomName) {
    const { name, sectorId, checksum } = parseRoomName(roomName);
    return partialSectorIdSum + (checkRoomName(name, checksum) ? sectorId : 0);
  }, 0);

  return `The sum of the sector IDs of the real rooms is ${sectorIdSum}`;
});
