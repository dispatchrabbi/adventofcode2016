const mod = function(num, divisor) {
  return ((num % divisor) + divisor) % divisor;
}

const createBoard = function(width, height) {
  const board = [];
  for (var i = 0; i < height; ++i) {
    board.push(Array(width).fill(false));
  }

  return board;
};

const ILLUMINATE_RECT_REGEX = /^rect (\d+)x(\d+)$/;
const ROTATE_ROW_REGEX = /^rotate row y=(\d+) by (\d+)$/;
const ROTATE_COL_REGEX = /^rotate column x=(\d+) by (\d+)$/;
const performInstructionOnBoard = function(board, instruction) {
  let matches;
  if (matches = ILLUMINATE_RECT_REGEX.exec(instruction)) {
    return illuminateTopLeftRectangle(board, +matches[1], +matches[2]);
  } else if (matches = ROTATE_ROW_REGEX.exec(instruction)) {
    return rotateRow(board, +matches[1], +matches[2]);
  } else if (matches = ROTATE_COL_REGEX.exec(instruction)) {
    return rotateColumn(board, +matches[1], +matches[2]);
  } else {
    throw new Error(`Unrecognized instruction: ${instruction}`);
  }
};

const illuminateTopLeftRectangle = function(board, width, height) {
  const newBoard = board.map(function(row, rowIndex) {
    return row.map(function(pixel, colIndex) {
      return (rowIndex < height && colIndex < width) ? true : pixel;
    });
  });

  return newBoard;
};

const rotateRow = function(board, rowToRotate, distance) {
  const width = board[0].length;
  const newRow = Array(width).fill(null).map(function(pixel, colIndex) {
    return board[rowToRotate][mod(colIndex - distance, width)];
  });
  const newBoard = board.map(function(row, rowIndex) {
    return rowIndex === rowToRotate ? newRow : row;
  });

  return newBoard;
};

const rotateColumn = function(board, colToRotate, distance) {
  const height = board.length;
  const newCol = Array(height).fill(null).map(function(pixel, rowIndex) {
    return board[mod(rowIndex - distance, height)][colToRotate];
  });
  const newBoard = board.map(function(row, rowIndex) {
    return row.map(function(pixel, colIndex) {
      return (colIndex === colToRotate) ? newCol[rowIndex] : pixel;
    });
  });

  return newBoard;
};

const countIlluminatedPixels = function(board) {
  var total = board.reduce(function(count, row) {
    return row.reduce(function(rowCount, pixel) {
      return rowCount + (pixel ? 1 : 0);
    }, count);
  }, 0);
  return total;
};

const printBoard = function(board) {
  const height = board.length;
  const width = board[0].length;
  const printedBoard = board.map(function(row) {
    return row.map(pixel => pixel ? '◼︎' : '◻︎').join('');
  }).join('\n');

  return printedBoard + '\n';
};

const BOARD_WIDTH = 50;
const BOARD_HEIGHT = 6;

const readFileAndReport = require('../shared/readFileAndReport.js');
readFileAndReport(function(input) {
  const instructions = input.split('\n').slice(0, -1);
  const finalBoard = instructions.reduce(function(board, instruction, ix) {
    const newBoard = performInstructionOnBoard(board, instruction);
    return newBoard;
  }, createBoard(BOARD_WIDTH, BOARD_HEIGHT));

  return printBoard(finalBoard) + '\n' + `There are ${countIlluminatedPixels(finalBoard)} / ${BOARD_WIDTH * BOARD_HEIGHT} pixels illuminated.`;
});
