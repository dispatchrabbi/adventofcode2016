const isTriangle = function(a, b, c) {
  const [leg1, leg2, biggest] = [+a, +b, +c].sort((a, b) => { return a - b; });
  return (leg1 + leg2 > biggest);
};

const readFileAndReport = require('../shared/readFileAndReport.js');
readFileAndReport(function(input) {
  const triads = input.split('\n').slice(0, -1);
  const numberOfTriangles = triads.reduce(function(totalSoFar, triad) {
    const [a, b, c] = triad.split(/[ ]+/);
    return totalSoFar + (isTriangle(+a, +b, +c) ? 1 : 0);
  }, 0);

  return `Out of ${triads.length} triads, ${numberOfTriangles} were triangles.`;
});
