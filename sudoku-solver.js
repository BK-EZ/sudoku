var SudokuBoard = require('./sudoku-board').SudokuBoard;

function SudokuSolver() {};

SudokuSolver.solve = function(sudokuBoard) {
  var numInts = SudokuSolver.countNumBlanks(sudokuBoard);

  var testSolutionArr = [];
  for (var i = 0; i < numInts; i++) {
    testSolutionArr.push(1);
  }

  //copy arr1 into arr2
  function copyArray(arr1, solvingSudokuBoard) {
    solvingSudokuBoard.boardArray = [];
    for (var y = 0; y < arr1.length; y++) {
      solvingSudokuBoard.boardArray[y] = [];
      for (var x = 0; x < arr1[y].length; x++) {
        var val = arr1[y][x];
        //console.log('val is '+ val);
        solvingSudokuBoard.boardArray[y].push(val);
      }
    }
    console.log('here is arr2: ');
    console.log(solvingSudokuBoard.toString());
  }


  // we create a copy of the main sudoku
  var solvingSudokuBoard = new SudokuBoard([]);
  copyArray(this.boardArray, solvingSudokuBoard);
  console.log('here is solvingSudokuBoard (should have 0s): \n' + solvingSudokuBoard.toString());
  console.log('here is mainSudokuBoard (should have 0s): \n' + this.toString());

  // we go through a loop until we solve the sudoku
  var solved = false;
  while (solved === false) {
    console.log('trying: ' + testSolutionArr + '\n');
    solvingSudokuBoard.putVals(testSolutionArr); // input our test values
    if (solvingSudokuBoard.isSolved() === true) {
      solved = true;
    } else {
      copyArray(this.boardArray, solvingSudokuBoard.boardArray); // set solvingSudokuBoard back to normal

      console.log('here is solvingSudokuBoard (should have 0s): \n' + solvingSudokuBoard.toString());

      if (arrayIsMaxed(testSolutionArr)) { // if we've already tried every possible solution...
        console.log('*****ERROR COULD NOT FIND SOLUTION***** WAS TRYING ' + testSolutionArr.length);
        return 'error';
      }
      testSolutionArr = incrementArray(testSolutionArr); // get the next solution
    }
  }

  //when solvingSudokuBoard is is finally correct...
  console.log(solvingSudokuBoard.toString());
  return solvingSudokuBoard;
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

SudokuSolver.arrayIsMaxed = function(array) { // check if every value in the array is 9
  console.log('the array is :' + array);
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
