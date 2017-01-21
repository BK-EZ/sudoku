var expect = require('chai').expect;
var SudokuBoard = require('../../sudoku-board').SudokuBoard;
var checkArrayWorks = require('../../sudoku-board').checkArrayWorks;
var nextTestSolutionArr = require('../../sudoku-board').nextTestSolutionArr;
var alreadyTriedMax = require('../../sudoku-board').alreadyTriedMax;
var helper = require('./helpers/sudoku-board-test-helper.js');

var emptyBoard = new SudokuBoard(helper.emptyArray);
var correctBoard = new SudokuBoard(helper.correctArray);
var incorrectBoard = new SudokuBoard(helper.incorrectArray);
var unsolvedBoard = new SudokuBoard(helper.unsolvedArray);
var unsolvedBrokenBoard = new SudokuBoard(helper.unsolvedBrokenArray);
var unsolvedHARDBoard = new SudokuBoard(helper.unsolvedHARDArray);

describe('SodukoBoard', function() {

  describe('constructor', function() {

    it('should create a board with 9 rows', function() {
      expect(emptyBoard.boardArray.length).to.equal(9);
    });

    it('should provide each row with exactly 9 values', function() {
      for (var i = 0; i < 9; i++) {
        expect(emptyBoard.boardArray[i].length).to.equal(9)
      }
    });

    it('should entirely fill the board with placeholder 0s', function() {
      for (var y = 0; y < 9; y++) {
        for (var x = 0; x < 9; x++) {
          expect(emptyBoard.boardArray[y][x]).to.equal(0);
        }
      }
    });

  });

  describe('#displayGrid()', function() {

    it('should display as a grid', function() {
      expect(emptyBoard.displayGrid()).
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

  });

  describe('#getCols()', function() {

    it('should return an array of arrays of each collumn in a SudokuBoard', function() {
      var colsArr = correctBoard.getCols();
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

  describe('checking if Board is correct', function() {
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
        var result = correctBoard.checkboardArray();
        expect(result).to.equal(true);
      });
      it('returns false if an entire board is incorrect (only checking rows)', function() {
        var result = incorrectBoard.checkboardArray();
        expect(result).to.equal(false);
      });
      describe('checking cols', function() {
        it('returns true if an entire board is correct (only checking cols)', function() {
          var result = correctBoard.checkAllCols();
          expect(result).to.equal(true);
        });
        it('returns false if an entire board is incorrect (only checking cols)', function() {
          var result = incorrectBoard.checkAllCols();
          expect(result).to.equal(false);
        });
      })
      describe('checking boxes', function() {
        it('returns true if an entire board is correct (only checking boxes)', function() {
          var result = correctBoard.checkAllBoxes();
          expect(result).to.equal(true);
        });
        it('returns false if an entire board is incorrect (only checking boxes)', function() {
          var result = incorrectBoard.checkAllBoxes();
          expect(result).to.equal(false);
        });
      });
      describe('checks everything', function() {
        it('returns true if everything is correct', function(){
          var result = correctBoard.checkEverything();
          expect(result).to.equal(true);
        });
        it('returns false if anything is incorrect', function(){
          var result = incorrectBoard.checkEverything();
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
  describe('solving sudoku Board', function() {
    it('counts the number of blank numbers/ placeholders in the board', function(){
      var result = unsolvedBoard.countNumBlanks();
      expect(result).to.equal(5)
    });
    it('can replace blanks with numbers from an array', function(){
      var testSudokuBoard = new SudokuBoard(helper.unsolvedInputArray);
      testSudokuBoard.putVals([9, 2, 5, 9, 7]);
      var result = testSudokuBoard.boardArray;
      expect(result).to.deep.equal(helper.correctArray);
    })
    it('returns the solved Board', function(){
      var result = unsolvedBoard.solve().boardArray;
      expect(result).to.deep.equal(helper.correctArray);
    });
    xit('returns an error if it cant be solved', function(){
      var result = unsolvedBrokenBoard.solve();
      expect(result).to.equal('error');
    });
    xit('returns the solved HARD puzzle', function(){
      var result = unsolvedHARDBoard.solve();
      expect(result).to.equal(Helper.correctHARDArray);
    });
  })
});
