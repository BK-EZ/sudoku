

var expect = require('chai').expect;
var Sudoku = require('../../sudoku').Sudoku;
var checkArrayWorks = require('../../sudoku').checkArrayWorks;
var nextTestSolutionArr = require('../../sudoku').nextTestSolutionArr;
var alreadyTriedMax = require('../../sudoku').alreadyTriedMax;
var emptyRow = [0, 0, 0, 0, 0, 0, 0, 0, 0];

var allRowsEmpty = [
  emptyRow,
  emptyRow,
  emptyRow,
  emptyRow,
  emptyRow,
  emptyRow,
  emptyRow,
  emptyRow,
  emptyRow
];

var correctArray = [
  [1, 3, 5, 8, 4, 6, 2, 9, 7],
  [6, 7, 4, 3, 9, 2, 5, 8, 1],
  [8, 9, 2, 1, 5, 7, 3, 4, 6],
  [2, 8, 9, 4, 1, 3, 6, 7, 5],
  [3, 4, 7, 5, 6, 8, 1, 2, 9],
  [5, 6, 1, 7, 2, 9, 4, 3, 8],
  [7, 1, 8, 6, 3, 4, 9, 5, 2],
  [9, 5, 3, 2, 8, 1, 7, 6, 4],
  [4, 2, 6, 9, 7, 5, 8, 1, 3]
];

var incorrectArray = [
  [1, 3, 5, 8, 4, 6, 2, 9, 7],
  [6, 7, 4, 3, 9, 2, 5, 8, 1],
  [8, 9, 2, 1, 5, 7, 3, 4, 6],
  [2, 8, 9, 1, 1, 3, 6, 7, 5],
  [3, 4, 7, 5, 6, 8, 1, 2, 9],
  [5, 6, 1, 7, 2, 9, 4, 3, 8],
  [7, 1, 8, 6, 3, 4, 9, 5, 2],
  [9, 5, 3, 2, 8, 1, 7, 6, 4],
  [4, 2, 6, 9, 7, 5, 8, 1, 3]
];

var unsolvedArray = [
  [1, 3, 5, 8, 4, 6, 2, 9, 7],
  [6, 7, 4, 3, 0, 2, 5, 8, 1],
  [8, 9, 2, 1, 5, 7, 3, 4, 6],
  [0, 8, 9, 4, 1, 3, 6, 7, 0],
  [3, 4, 7, 5, 6, 8, 1, 2, 0],
  [5, 6, 1, 0, 2, 9, 4, 3, 8],
  [7, 1, 8, 6, 3, 4, 9, 5, 2],
  [9, 5, 3, 2, 8, 1, 7, 6, 4],
  [4, 2, 6, 9, 7, 5, 8, 1, 3]
];

var unsolvedInputArray = [
  [1, 3, 5, 8, 4, 6, 2, 9, 7],
  [6, 7, 4, 3, 0, 2, 5, 8, 1],
  [8, 9, 2, 1, 5, 7, 3, 4, 6],
  [0, 8, 9, 4, 1, 3, 6, 7, 0],
  [3, 4, 7, 5, 6, 8, 1, 2, 0],
  [5, 6, 1, 0, 2, 9, 4, 3, 8],
  [7, 1, 8, 6, 3, 4, 9, 5, 2],
  [9, 5, 3, 2, 8, 1, 7, 6, 4],
  [4, 2, 6, 9, 7, 5, 8, 1, 3]
];

var unsolvedBrokenArray = [
  [3, 3, 5, 8, 4, 6, 2, 9, 7],
  [6, 7, 4, 3, 0, 2, 5, 8, 1],
  [8, 9, 2, 1, 5, 7, 3, 4, 6],
  [0, 8, 9, 4, 1, 3, 6, 7, 0],
  [3, 4, 7, 5, 6, 8, 1, 2, 0],
  [5, 6, 1, 0, 2, 9, 4, 3, 8],
  [7, 1, 8, 6, 3, 4, 9, 5, 2],
  [9, 5, 3, 2, 8, 1, 7, 6, 4],
  [4, 2, 6, 9, 7, 5, 8, 1, 3]
];

var unsolvedHARDArray = [
  [8, 0, 6, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 6, 0, 0, 0, 0, 0],
  [0, 0, 0, 9, 0, 3, 2, 0, 0],
  [9, 3, 0, 2, 0, 0, 0, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 2, 6],
  [0, 0, 0, 3, 4, 0, 5, 0, 0],
  [1, 0, 0, 0, 8, 0, 0, 0, 0],
  [3, 0, 0, 0, 0, 7, 0, 0, 4],
  [0, 0, 4, 0, 0, 0, 0, 0, 0]
];

var correctHARDArray = [
  [8, 1, 6, 7, 2, 4, 9, 3, 5],
  [2, 9, 3, 6, 5, 8, 7, 4, 1],
  [4, 7, 5, 9, 1, 3, 2, 6, 8],
  [9, 3, 8, 2, 6, 5, 4, 1, 7],
  [5, 4, 1, 8, 7, 9, 3, 2, 6],
  [6, 2, 7, 3, 4, 1, 5, 8, 9],
  [1, 5, 9, 4, 8, 2, 6, 7, 3],
  [3, 6, 2, 1, 9, 7, 8, 5, 4],
  [7, 8, 4, 5, 3, 6, 1, 9, 2]
];

var emptyTable = new Sudoku(allRowsEmpty); // creates the object
var correctTable = new Sudoku(correctArray); // creates the object
var incorrectTable = new Sudoku(incorrectArray); // creates the object
var unsolvedTable = new Sudoku(unsolvedArray);
var unsolvedBrokenTable = new Sudoku(unsolvedBrokenArray);
var unsolvedHARDTable = new Sudoku(unsolvedHARDArray);

describe('Soduko', function() {
  describe('creating sudoku tables', function() {
    it('table should have 9 rows', function() {
      expect(emptyTable.allRows.length).to.equal(9);
    });
    it('each row should have 9 values', function() {
      expect(emptyTable.allRows[0].length).to.equal(9)
      expect(emptyTable.allRows[1].length).to.equal(9);
      expect(emptyTable.allRows[2].length).to.equal(9);
      expect(emptyTable.allRows[3].length).to.equal(9);
      expect(emptyTable.allRows[4].length).to.equal(9);
      expect(emptyTable.allRows[5].length).to.equal(9);
      expect(emptyTable.allRows[6].length).to.equal(9);
      expect(emptyTable.allRows[7].length).to.equal(9);
      expect(emptyTable.allRows[8].length).to.equal(9);
    });
    it('the placeholder value at any particular index should be 0', function() {
      expect(emptyTable.allRows[0][0]).to.equal(0);
      expect(emptyTable.allRows[8][8]).to.equal(0);
      expect(emptyTable.allRows[3][5]).to.equal(0);
    });
    it('each value in a row is between 0 and 9', function() {
      for (var y = 0; y < 9; y++) {
        for (var x = 0; x < 9; x++) {
          expect(emptyTable.allRows[y][x]).to.equal(0);
        }
      }
    })
  });
  describe('displaying sudoku table in the form of a grid', function() {
    it('should display as a grid', function() {
      expect(emptyTable.displayGrid()).
      to.deep.equal('0 0 0 0 0 0 0 0 0 \n' +
        '0 0 0 0 0 0 0 0 0 \n' +
        '0 0 0 0 0 0 0 0 0 \n' +
        '0 0 0 0 0 0 0 0 0 \n' +
        '0 0 0 0 0 0 0 0 0 \n' +
        '0 0 0 0 0 0 0 0 0 \n' +
        '0 0 0 0 0 0 0 0 0 \n' +
        '0 0 0 0 0 0 0 0 0 \n' +
        '0 0 0 0 0 0 0 0 0 \n');
    });
    //console.log(emptyTable.displayGrid());
  });
  describe('getCols', function() {
    it('returns an array of arrays of each collumn in a Sudoku table', function() {
      var colsArr = correctTable.getCols();
      expect(colsArr).to.deep.equal([
        [1, 6, 8, 2, 3, 5, 7, 9, 4],
        [3, 7, 9, 8, 4, 6, 1, 5, 2],
        [5, 4, 2, 9, 7, 1, 8, 3, 6],
        [8, 3, 1, 4, 5, 7, 6, 2, 9],
        [4, 9, 5, 1, 6, 2, 3, 8, 7],
        [6, 2, 7, 3, 8, 9, 4, 1, 5],
        [2, 5, 3, 6, 1, 4, 9, 7, 8],
        [9, 8, 4, 7, 2, 3, 5, 6, 1],
        [7, 1, 6, 5, 9, 8, 2, 4, 3]
      ]);

    });
  });
  describe('checking if table is correct', function() {
    describe('checking rows', function() {
      it('returns true if a specific row is correct', function() {
        var newRow = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        expect(checkArrayWorks(newRow)).to.equal(true);
      });
      it('returns false if a specific row is incorrect', function() {
        var newRow = [1, 2, 3, 4, 5, 7, 7, 8, 9];
        expect(checkArrayWorks(newRow)).to.equal(false);
      });
      it('returns true if an entire board is correct (only checking rows)', function() {
        var result = correctTable.checkAllRows();
        expect(result).to.equal(true);
      });
      it('returns false if an entire board is incorrect (only checking rows)', function() {
        var result = incorrectTable.checkAllRows();
        expect(result).to.equal(false);
      });
      describe('checking cols', function() {
        it('returns true if an entire board is correct (only checking cols)', function() {
          var result = correctTable.checkAllCols();
          expect(result).to.equal(true);
        });
        it('returns false if an entire board is incorrect (only checking cols)', function() {
          var result = incorrectTable.checkAllCols();
          expect(result).to.equal(false);
        });
      })
      describe('checking boxes', function() {
        it('returns true if an entire board is correct (only checking boxes)', function() {
          var result = correctTable.checkAllBoxes();
          expect(result).to.equal(true);
        });
        it('returns false if an entire board is incorrect (only checking boxes)', function() {
          var result = incorrectTable.checkAllBoxes();
          expect(result).to.equal(false);
        });
      });
      describe('checks everything', function() {
        it('returns true if everything is correct', function(){
          var result = correctTable.checkEverything();
          expect(result).to.equal(true);
        });
        it('returns false if anything is incorrect', function(){
          var result = incorrectTable.checkEverything();
          expect(result).to.equal(false);
        });
      });
    });
  });
  describe('nextTestSolutionArr', function(){
    it('increments by 1', function(){
      var arr = [1, 1, 1];
      var res = nextTestSolutionArr(arr);
      expect(res).to.deep.equal([1, 1, 2]);
    });
    it('increments by 1 and carries over', function(){
      var arr = [2, 9, 9];
      var res = nextTestSolutionArr(arr);
      expect(res).to.deep.equal([3, 0, 0]);
    });
    it('alreadyTriedMax returns true if all values are 9', function(){
      var arr = [9, 9, 9];
      var res = alreadyTriedMax(arr);
      expect(res).to.equal(true);
    });
    it('alreadyTriedMax returns false if all values are not 9', function(){
      var arr = [9, 8, 9];
      var res = alreadyTriedMax(arr);
      expect(res).to.equal(false);
    });
  });
  describe('solving sudoku table', function() {
    it('counts the number of blank numbers/ placeholders in the board', function(){
      var result = unsolvedTable.countNumBlanks();
      expect(result).to.equal(5)
    });
    it('can replace blanks with numbers from an array', function(){
      var testSudoku = new Sudoku(unsolvedInputArray);
      testSudoku.putVals([9, 2, 5, 9, 7]);
      var result = testSudoku.allRows;
      expect(result).to.deep.equal(correctArray);
    })
    it('returns the solved table', function(){
      var result = unsolvedTable.solve().allRows;
      expect(result).to.deep.equal(correctArray);
    });
    xit('returns an error if it cant be solved', function(){
      var result = unsolvedBrokenTable.solve();
      expect(result).to.equal('error');
    });
    xit('returns the solved HARD puzzle', function(){
      var result = unsolvedHARDTable.solve();
      expect(result).to.equal(correctHARDArray);
    });
  })
});
