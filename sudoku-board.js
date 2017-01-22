function SudokuBoard(boardArr) {
  var clonedBoardArr = JSON.parse(JSON.stringify(boardArr)); // deep copies array- but only works with primitives!
  this.boardArray = clonedBoardArr;
}

SudokuBoard.arraySatisfiesSolution = function(arr) {
  if(arr.length !== 9) {
    return false;
  }
  var uniqueNumsInArr = {};
  for (var num of arr) {
    if (uniqueNumsInArr[num] || num > 9 || num < 1) {
      return false;
    } else {
      uniqueNumsInArr[num] = 1;
    }
  }
  return true;
}

SudokuBoard.prototype.isSolved = function() {
  return (this.allRowsSatisfySolution() && this.allColsSatisfySolution() && this.allBoxesSatisfySolution());
}

SudokuBoard.prototype.toString = function() {
  var boardAsString = '';
  for (var row of this.boardArray) {
    for (var num of row) {
      boardAsString += (num + ' ');
    }
    boardAsString += '\n'
  }
  return boardAsString;
}

SudokuBoard.prototype.getRows = function() {
  return this.boardArray;
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

SudokuBoard.prototype.allRowsSatisfySolution = function() {
  for (var row of this.boardArray) {
    if (SudokuBoard.arraySatisfiesSolution(row) == false) {
      return false
    }
  }
  return true;
}

SudokuBoard.prototype.allColsSatisfySolution = function() {
  for (var col of this.getCols()) {
    if (SudokuBoard.arraySatisfiesSolution(col) == false) {
      return false
    }
  }
  return true;
}

SudokuBoard.prototype.allBoxesSatisfySolution = function() {
  for (var box of this.getBoxes()) {
    if (SudokuBoard.arraySatisfiesSolution(box) == false) {
      return false
    }
  }
  return true;
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

SudokuBoard.prototype.insert = function(arr) {
  for (var row of this.boardArray) {
    for (var index in row) {
      if (row[index] === 0) {
        row[index] = arr.shift(); // shift pops value at 0th index
      }
    }
  }
}

module.exports = {
  SudokuBoard: SudokuBoard,
};
