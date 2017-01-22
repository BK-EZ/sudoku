var SudokuBoard = require('./sudoku-board').SudokuBoard;

function SudokuSolver() {};

SudokuSolver.generateInitialArrayOfInputs = function(num) {
  var arr = [];
  for (var i = 0; i < num; i++) {
    arr.push(1);
  }
  return arr;
}

SudokuSolver.solve = function(sudokuBoard) {
  var numBlanks = SudokuSolver.countNumBlanks(sudokuBoard);
  if (numBlanks === 0) {
    return new SudokuBoard(sudokuBoard.getRows());
  }
  potentialSolutionArray = SudokuSolver.generateInitialArrayOfInputs(numBlanks);
  while(!SudokuSolver.arrayIsMaxed(potentialSolutionArray)) {
    solutionBoard = new SudokuBoard(sudokuBoard.getRows());
    solutionBoard.insert(potentialSolutionArray);
    if (solutionBoard.isSolved()) {
      return solutionBoard;
    } else {
      potentialSolutionArray = SudokuSolver.incrementArray(potentialSolutionArray);
    }
  }
  return 'error: no solution exists';
}

SudokuSolver.countNumBlanks = function(sudokuBoard) {
  var numBlanks = 0;
  for (var row of sudokuBoard.boardArray) {
    for (var num of row) {
      if (num === 0) {
        numBlanks += 1;
      }
    }
  }
  return numBlanks;
}

SudokuSolver.arrayIsMaxed = function(array) {
  for (var num of array) {
    if (num != 9) {
      return false;
    }
  }
  return true;
}

SudokuSolver.incrementArray = function(array) {
  var solutionStr = '';
  for (var num of array) {
    solutionStr += num;
  }
  var solutionInt = parseInt(solutionStr);
  solutionInt++;
  solutionStr = solutionInt.toString();
  var solutionArr = [];
  for (var char of solutionStr) {
    solutionArr.push(parseInt(char));
  }
  return solutionArr;
}

module.exports = {
  SudokuSolver: SudokuSolver
}
