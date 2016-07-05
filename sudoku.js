function Sudoku(allRows, name) {
  this.allRows = allRows;
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
    if (hashMap[val]) { // if something is already here (we found a duplicate)
      return false;
    } else { // if this value hasnt been added yet
      hashMap[val] = 1;
    }
  }
  return true;
}

Sudoku.prototype.getCols = function() {
  
}

Sudoku.prototype.checkAllRows = function(){
  for(var row of this.allRows){
    if (checkArrayWorks(row) == false){
      return false
    }
  }
  return true;
}


module.exports = {
  Sudoku: Sudoku,
  checkArrayWorks: checkArrayWorks
};
