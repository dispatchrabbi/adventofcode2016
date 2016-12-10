const transposeArray = function(toTranspose) {
  const transposed = toTranspose.reduce(function(transposedInProgress, row) {
    row.forEach(function(el, ix) {
      if (!transposedInProgress[ix]) { transposedInProgress[ix] = []; }
      transposedInProgress[ix].push(el);
    });
    return transposedInProgress;
  }, []);

  return transposed;
};

const findMostCommonCharacter = function(characterArray) {
  const characterCounts = characterArray.reduce(function(counts, char) {
    counts[char] = (counts[char] || 0) + 1;
    return counts;
  }, {});

  return Object.keys(characterCounts).sort(function(a, b) { return characterCounts[b] - characterCounts[a]; })[0];
};

const decodeRepeatedMessage = function(attempts) {
  const transposedAttempts = transposeArray(attempts.map(attempt => attempt.split('')));
  const decodedMessage = transposedAttempts.map(findMostCommonCharacter).join('');
  return decodedMessage;
};

const readFileAndReport = require('../shared/readFileAndReport.js');
readFileAndReport(function(input) {
  const attempts = input.split('\n').slice(0, -1);
  const message = decodeRepeatedMessage(attempts);

  return `The decoded message is "${message}".`;
});
