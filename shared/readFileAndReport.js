const fs = require('fs');
const process = require('process');

const readFileAndReport = function(cb) {
  if(process.argv.length < 2) {
    throw new Error('No input file given - please use `node dayX/index.js dayX/input.txt`.');
  }

  const instructionsFile = process.argv[2];
  fs.readFile(instructionsFile, 'utf8', (err, data) => {
    if(err) { throw err; }

    const logLine = cb(data);
    console.log(logLine);
  });
};

module.exports = readFileAndReport;
