const uncompress = function(compressedText) {
  let cursor = 0;
  let mode = 'normal';
  let buffer = '';
  let repeatSpan = 0;
  let repeatTimes = 0;

  let uncompressedText = '';
  while(cursor < compressedText.length) {
    const cursorChar = compressedText[cursor];
    ++cursor;

    if (mode === 'normal') {
      if (cursorChar === '(') {
        mode = 'span';
      } else {
        uncompressedText += cursorChar;
      }
    } else if (mode === 'span') {
      if (/\d/.test(cursorChar)) {
        buffer += cursorChar;
      } else if (cursorChar === 'x') {
        repeatSpan = +buffer;
        buffer = '';
        mode = 'times';
      }
    } else if (mode === 'times') {
      if (/\d/.test(cursorChar)) {
        buffer += cursorChar;
      } else if (cursorChar === ')') {
        repeatTimes = +buffer;
        buffer = '';
        mode = 'normal';

        uncompressedText += compressedText.substr(cursor, repeatSpan).repeat(repeatTimes);
        cursor += repeatSpan;

        repeatSpan = 0;
        repeatTimes = 0;
      }
    } else {
      throw new Error(`The uncompressor is in ${mode} mode, and has no idea how it got there.`);
    }
  }

  return uncompressedText;
};

const readFileAndReport = require('../shared/readFileAndReport.js');
readFileAndReport(function(input) {
  const compressedText = input.replace(/\s+/g, '');
  const uncompressedText = uncompress(compressedText);

  return `The uncompressed text reads (${uncompressedText.length} bytes):` + '\n' +
          uncompressedText + '\n';
});
