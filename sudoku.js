function Sudoku(allRows, name) {
  this.allRows = allRows;
}

Sudoku.prototype.checkEverything = function() {
  if (this.checkAllRows() && this.checkAllCols() && this.checkAllBoxes()) {
    return true;
  }
  return false;
}

Sudoku.prototype.displayAll = function() {
  for (var y = 0; y < 9; y++) {
    for (var x = 0; x < 9; x++) {
      console.log(y + ' ' + x + ': ' + this.allRows[y][x]);
    }
  }
};

Sudoku.prototype.displayGrid = function() {
  var gridString = '';
  for (var row of this.allRows) { // for each row
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

Sudoku.prototype.getCols = function() {
  var allCols = [];
  for (var col = 0; col < 9; col++) {
    allCols[col] = [];
    for (var row = 0; row < 9; row++) {
      allCols[col].push(this.allRows[row][col])
    }
  }
  return allCols;
}

Sudoku.prototype.checkAllRows = function() {
  for (var row of this.allRows) {
    if (checkArrayWorks(row) == false) {
      return false
    }
  }
  return true;
}

Sudoku.prototype.checkAllCols = function() {
  for (var col of this.getCols()) { // one element of array of cols
    if (checkArrayWorks(col) == false) {
      return false
    }
  }
  return true;
}

Sudoku.prototype.checkAllBoxes = function() {
  for (var box of this.getBoxes()) { // one element of array of cols
    if (checkArrayWorks(box) == false) {
      return false
    }
  }
  return true;
}

Sudoku.prototype.countNumBlanks = function() {
  var tracker = 0;
  for (var row of this.allRows) { // for each row
    for (var element of row) { // for each col within a row
      if (element === 0) {
        tracker += 1
      }
    }
  }
  return tracker;
}



Sudoku.prototype.getBoxes = function() {
  var boxRow1 = this.allRows.filter(function(val, index) {
    return index < 3;
  });
  var boxRow2 = this.allRows.filter(function(val, index) {
    return index > 2 && index < 6;
  });
  var boxRow3 = this.allRows.filter(function(val, index) {
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

Sudoku.prototype.putVals = function(array) {
  for (var row of this.allRows) { // for each row
    for (var index in row) { // for each col within a row
      if (row[index] === 0) {
        row[index] = array.shift(); //array.shift() removes and returns the first element of the array
      }
    }
  }
}




Sudoku.prototype.solve = function() {
  console.log(this.displayGrid());
  // figure out how many numbers we need
  var numInts = this.countNumBlanks();

  // set up the testSolution array
  var testSolutionArr = [];
  for (var i = 0; i < numInts; i++) {
    testSolutionArr.push(1);
  }

  //copy arr1 into arr2
  function copyArray(arr1, solvingSudoku) {
    solvingSudoku.allRows = [];
    for (var y = 0; y < arr1.length; y++) {
      solvingSudoku.allRows[y] = [];
      for (var x = 0; x < arr1[y].length; x++) {
        var val = arr1[y][x];
        //console.log('val is '+ val);
        solvingSudoku.allRows[y].push(val);
      }
    }
    console.log('here is arr2: ');
    console.log(solvingSudoku.displayGrid());
  }


  // we create a copy of the main sudoku
  var solvingSudoku = new Sudoku([]);
  copyArray(this.allRows, solvingSudoku);
  console.log('here is solvingSudoku (should have 0s): \n' + solvingSudoku.displayGrid());
  console.log('here is mainSudoku (should have 0s): \n' + this.displayGrid());

  // we go through a loop until we solve the sudoku
  var solved = false;
  while (solved === false) {
    console.log('trying: ' + testSolutionArr + '\n');
    solvingSudoku.putVals(testSolutionArr); // input our test values
    if (solvingSudoku.checkEverything() === true) {
      solved = true;
    } else {
      copyArray(this.allRows, solvingSudoku.allRows); // set solvingSudoku back to normal

      console.log('here is solvingSudoku (should have 0s): \n' + solvingSudoku.displayGrid());

      if (alreadyTriedMax(testSolutionArr)) { // if we've already tried every possible solution...
        console.log('*****ERROR COULD NOT FIND SOLUTION***** WAS TRYING ' + testSolutionArr.length);
        return 'error';
      }
      testSolutionArr = nextTestSolutionArr(testSolutionArr); // get the next solution
    }
  }

  //when solvingSudoku is is finally correct...
  console.log(solvingSudoku.displayGrid());
  return solvingSudoku;
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
  Sudoku: Sudoku,
  checkArrayWorks: checkArrayWorks,
  nextTestSolutionArr: nextTestSolutionArr,
  alreadyTriedMax: alreadyTriedMax
};
