function SudokuBoard(boardArray) {
  this.boardArray = boardArray;
}

SudokuBoard.prototype.checkEverything = function() {
  if (this.checkboardArray() && this.checkAllCols() && this.checkAllBoxes()) {
    return true;
  }
  return false;
}

SudokuBoard.prototype.displayAll = function() {
  for (var y = 0; y < 9; y++) {
    for (var x = 0; x < 9; x++) {
      console.log(y + ' ' + x + ': ' + this.boardArray[y][x]);
    }
  }
};

SudokuBoard.prototype.displayGrid = function() {
  var gridString = '';
  for (var row of this.boardArray) { // for each row
    for (var element of row) { // for each col within a row
      gridString += element; // coordinates
      gridString += ' '
    }
    gridString += '\n'
  }
  return gridString;
}

function checkArrayWorks(array) {
  var hashMap = {};
  for (var val of array) {
    if (hashMap[val] || val === 0) { // if something is already here (we found a duplicate)
      return false;
    } else { // if this value hasnt been added yet
      hashMap[val] = 1;
    }
  }
  return true;
}

SudokuBoard.prototype.getCols = function() {
  var allCols = [];
  for (var col = 0; col < 9; col++) {
    allCols[col] = [];
    for (var row = 0; row < 9; row++) {
      allCols[col].push(this.boardArray[row][col])
    }
  }
  return allCols;
}

SudokuBoard.prototype.checkboardArray = function() {
  for (var row of this.boardArray) {
    if (checkArrayWorks(row) == false) {
      return false
    }
  }
  return true;
}

SudokuBoard.prototype.checkAllCols = function() {
  for (var col of this.getCols()) { // one element of array of cols
    if (checkArrayWorks(col) == false) {
      return false
    }
  }
  return true;
}

SudokuBoard.prototype.checkAllBoxes = function() {
  for (var box of this.getBoxes()) { // one element of array of cols
    if (checkArrayWorks(box) == false) {
      return false
    }
  }
  return true;
}

SudokuBoard.prototype.countNumBlanks = function() {
  var tracker = 0;
  for (var row of this.boardArray) { // for each row
    for (var element of row) { // for each col within a row
      if (element === 0) {
        tracker += 1
      }
    }
  }
  return tracker;
}



SudokuBoard.prototype.getBoxes = function() {
  var boxRow1 = this.boardArray.filter(function(val, index) {
    return index < 3;
  });
  var boxRow2 = this.boardArray.filter(function(val, index) {
    return index > 2 && index < 6;
  });
  var boxRow3 = this.boardArray.filter(function(val, index) {
    return index > 5;
  });

  var boxRow1Col1 = [];
  boxRow1.forEach(function(curRow, index, arr) {
    boxRow1Col1.push(curRow[0]);
    boxRow1Col1.push(curRow[1]);
    boxRow1Col1.push(curRow[2]);
  });

  var boxRow1Col2 = [];
  boxRow1.forEach(function(curRow, index, arr) {
    boxRow1Col2.push(curRow[3]);
    boxRow1Col2.push(curRow[4]);
    boxRow1Col2.push(curRow[5]);
  });

  var boxRow1Col3 = [];
  boxRow1.forEach(function(curRow, index, arr) {
    boxRow1Col3.push(curRow[6]);
    boxRow1Col3.push(curRow[7]);
    boxRow1Col3.push(curRow[8]);
  });

  var boxRow2Col1 = [];
  boxRow2.forEach(function(curRow, index, arr) {
    boxRow2Col1.push(curRow[0]);
    boxRow2Col1.push(curRow[1]);
    boxRow2Col1.push(curRow[2]);
  });

  var boxRow2Col2 = [];
  boxRow2.forEach(function(curRow, index, arr) {
    boxRow2Col2.push(curRow[3]);
    boxRow2Col2.push(curRow[4]);
    boxRow2Col2.push(curRow[5]);
  });

  var boxRow2Col3 = [];
  boxRow2.forEach(function(curRow, index, arr) {
    boxRow2Col3.push(curRow[6]);
    boxRow2Col3.push(curRow[7]);
    boxRow2Col3.push(curRow[8]);
  });

  var boxRow3Col1 = [];
  boxRow3.forEach(function(curRow, index, arr) {
    boxRow3Col1.push(curRow[0]);
    boxRow3Col1.push(curRow[1]);
    boxRow3Col1.push(curRow[2]);
  });

  var boxRow3Col2 = [];
  boxRow3.forEach(function(curRow, index, arr) {
    boxRow3Col2.push(curRow[3]);
    boxRow3Col2.push(curRow[4]);
    boxRow3Col2.push(curRow[5]);
  });

  var boxRow3Col3 = [];
  boxRow3.forEach(function(curRow, index, arr) {
    boxRow3Col3.push(curRow[6]);
    boxRow3Col3.push(curRow[7]);
    boxRow3Col3.push(curRow[8]);
  });

  var allBoxes = [];
  allBoxes.push(boxRow1Col1, boxRow1Col2, boxRow1Col3,
    boxRow2Col1, boxRow2Col2, boxRow2Col3,
    boxRow3Col1, boxRow3Col2, boxRow3Col3);

  return allBoxes;
}

SudokuBoard.prototype.putVals = function(array) {
  for (var row of this.boardArray) { // for each row
    for (var index in row) { // for each col within a row
      if (row[index] === 0) {
        row[index] = array.shift(); //array.shift() removes and returns the first element of the array
      }
    }
  }
}

SudokuBoard.prototype.solve = function() {
  console.log(this.displayGrid());
  // figure out how many numbers we need
  var numInts = this.countNumBlanks();

  // set up the testSolution array
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
    console.log(solvingSudokuBoard.displayGrid());
  }


  // we create a copy of the main sudoku
  var solvingSudokuBoard = new SudokuBoard([]);
  copyArray(this.boardArray, solvingSudokuBoard);
  console.log('here is solvingSudokuBoard (should have 0s): \n' + solvingSudokuBoard.displayGrid());
  console.log('here is mainSudokuBoard (should have 0s): \n' + this.displayGrid());

  // we go through a loop until we solve the sudoku
  var solved = false;
  while (solved === false) {
    console.log('trying: ' + testSolutionArr + '\n');
    solvingSudokuBoard.putVals(testSolutionArr); // input our test values
    if (solvingSudokuBoard.checkEverything() === true) {
      solved = true;
    } else {
      copyArray(this.boardArray, solvingSudokuBoard.boardArray); // set solvingSudokuBoard back to normal

      console.log('here is solvingSudokuBoard (should have 0s): \n' + solvingSudokuBoard.displayGrid());

      if (alreadyTriedMax(testSolutionArr)) { // if we've already tried every possible solution...
        console.log('*****ERROR COULD NOT FIND SOLUTION***** WAS TRYING ' + testSolutionArr.length);
        return 'error';
      }
      testSolutionArr = nextTestSolutionArr(testSolutionArr); // get the next solution
    }
  }

  //when solvingSudokuBoard is is finally correct...
  console.log(solvingSudokuBoard.displayGrid());
  return solvingSudokuBoard;
}

function alreadyTriedMax(array) { // check if every value in the array is 9
  console.log('the array is :' + array);
  for (var num of array) {
    if (num != 9) {
      return false;
    }
  }
  return true;
}

function nextTestSolutionArr(array) {
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
  SudokuBoard: SudokuBoard,
  checkArrayWorks: checkArrayWorks,
  nextTestSolutionArr: nextTestSolutionArr,
  alreadyTriedMax: alreadyTriedMax
};
