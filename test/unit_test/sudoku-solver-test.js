var expect = require('chai').expect;
var SudokuBoard = require('../../sudoku-board').SudokuBoard;
var SudokuSolver = require('../../sudoku-solver').SudokuSolver;
var helper = require('./helpers/sudoku-board-test-helper.js');

describe('SudokuSolver', function() {

  describe('#countNumBlanks()', function() {
    var unsolvedBoard = new SudokuBoard(helper.unsolvedArray);

    it('should count the number of blank placeholders (0s) in the board', function() {
      expect(SudokuSolver.countNumBlanks(unsolvedBoard)).to.equal(5);
    });
  });

  describe('#incrementArray()', function() {
    it('should incremant last value of the array by 1', function() {
      var arr = [1, 1, 1];
      expect(SudokuSolver.incrementArray(arr)).to.deep.equal([1, 1, 2]);
    });

    it('increments last value of value by 1 and carries values over', function() {
      var arr = [2, 9, 9];
      expect(SudokuSolver.incrementArray(arr)).to.deep.equal([3, 0, 0]);
    });
  });

  describe('#arrayIsMaxed()', function() {
    it('arrayIsMaxed returns true if all values are 9', function() {
      var arr = [9, 9, 9];
      expect(SudokuSolver.arrayIsMaxed(arr)).to.equal(true);
    });

    it('arrayIsMaxed returns false if all values are not 9', function(){
      var arr = [9, 8, 9];
      expect(SudokuSolver.arrayIsMaxed(arr)).to.equal(false);
    });
  });

  describe('#solve()', function() {
    var unsolvedBoard = new SudokuBoard(helper.unsolvedArray);

    it('returns the solved Board', function(){
      expect(SudokuSolver.solve(unsolvedBoard).getRows()).to.deep.equal(helper.correctArray);
    });
    xit('returns an error if it cant be solved', function(){
      var result = unsolvedBrokenBoard.solve();
      expect(result).to.equal('error');
    });
    xit('returns the solved HARD puzzle', function(){
      var result = unsolvedHARDBoard.solve();
      expect(result).to.equal(Helper.correctHARDArray);
    });
  });
});
