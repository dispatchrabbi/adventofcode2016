const hasABBA = function(str) {
  const ABBA_REGEX = /([a-z])([a-z])\2\1/g;
  let matches;
  while (matches = ABBA_REGEX.exec(str)) {
    if (matches && (matches[1] != matches[2])) {
      return true;
    }
  }
  return false;
};

const BRACES_REGEX = /\[[a-z]+?\]/g;
const supportsTLS = function(address) {
  const hypernetSequences = address.match(BRACES_REGEX).map(hs => { return hs.substring(1, hs.length - 1); });
  const outrons = address.split(BRACES_REGEX);

  const outronsWithABBA = outrons.filter(hasABBA);
  const hypernetsWithABBA = hypernetSequences.filter(hasABBA);
  
  return (outronsWithABBA.length > 0) && (hypernetsWithABBA.length < 1);
};

const readFileAndReport = require('../shared/readFileAndReport.js');
readFileAndReport(function(input) {
  const addresses = input.split('\n').slice(0, -1);
  const tlsAddresses = addresses.filter(supportsTLS);

  return `The number of addresses that support TLS is ${tlsAddresses.length}/${addresses.length}.`;
});
