var expect = require('chai').expect;
var SudokuBoard = require('../../sudoku-board').SudokuBoard;
var SudokuSolver = require('../../sudoku-solver').SudokuSolver;
var helper = require('./helper');

describe('SudokuSolver', function() {

  describe('#countNumBlanks()', function() {
    it('should count the number of blank placeholders (0s) in the board', function() {
      var unsolvedBoard = new SudokuBoard(helper.unsolvedArray);
      expect(SudokuSolver.countNumBlanks(unsolvedBoard)).to.equal(5);
    });
  });

  describe('#generateInitialArrayOfInputs()', function() {
    it('should return an array 1s with a length based on the parameter', function() {
      var expected = [1, 1, 1, 1, 1];
      var result = SudokuSolver.generateInitialArrayOfInputs(5);
      expect(result).to.deep.equal(expected);

      var expected = [1, 1];
      var result = SudokuSolver.generateInitialArrayOfInputs(2);
      expect(result).to.deep.equal(expected);
    });
  });

  describe('#incrementArray()', function() {
    it('should incremant last value of the array by 1 with short input', function() {
      var arr = [1, 1, 1];
      var result = SudokuSolver.incrementArray(arr);
      expect(result).to.deep.equal([1, 1, 2]);

      var arr = [2, 4, 5, 3];
      var result = SudokuSolver.incrementArray(arr);
      expect(result).to.deep.equal([2, 4, 5, 4]);
    });

    it('should incremant last value of the array by 1 with long input', function() {
      var arr = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
      var expectedArr = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2];
      var result = SudokuSolver.incrementArray(arr);
      expect(result).to.deep.equal(expectedArr);
    });

    it('increments last value of value by 1 and carries values over', function() {
      var arr = [2, 9, 9];
      var result = SudokuSolver.incrementArray(arr);
      expect(result).to.be.an('array');
      expect(result).to.deep.equal([3, 0, 0]);
    });
  });

  describe('#arrayIsMaxed()', function() {
    it('arrayIsMaxed returns true if all values are 9', function() {
      var arr = [9, 9, 9];
      expect(SudokuSolver.arrayIsMaxed(arr)).to.equal(true);
    });

    it('arrayIsMaxed returns false if all values are not 9', function() {
      var arr = [9, 8, 9];
      expect(SudokuSolver.arrayIsMaxed(arr)).to.equal(false);
    });
  });

  // to do: use .done() with long expect statements
  describe('#solve()', function() {
    it('should return the solved Board if given an unsolved (easy) one', function() {
      var unsolvedBoard = new SudokuBoard(helper.unsolvedArray);
      var solvedBoard = SudokuSolver.solve(unsolvedBoard);
      expect(solvedBoard).to.be.a('object');
      expect(solvedBoard.isSolved()).to.equal(true);
      expect(solvedBoard.getRows()).to.deep.equal(helper.correctArray);
    });

    it('should return the solved Board if given an unsolved (hard) one', function() {
      var unsolvedBoard2 = new SudokuBoard(helper.unsolvedHARDArray);
      var solvedBoard2 = SudokuSolver.solve(unsolvedBoard2);
      expect(solvedBoard2).to.be.a('object');
      expect(solvedBoard2.isSolved()).to.equal(true);
      expect(solvedBoard2.getRows()).to.deep.equal(helper.correctHARDArray);
    });

    it('should return the solved Board if given an an already solved one', function() {
      var unsolvedBoard = new SudokuBoard(helper.correctArray);
      var solvedBoard = SudokuSolver.solve(unsolvedBoard);
      expect(solvedBoard).to.be.a('object');
      expect(solvedBoard.getRows()).to.deep.equal(helper.correctArray);

      var unsolvedBoard = new SudokuBoard(helper.correctHARDArray);
      var solvedBoard = SudokuSolver.solve(unsolvedBoard);
      expect(solvedBoard).to.be.a('object');
      expect(solvedBoard.getRows()).to.deep.equal(helper.correctHARDArray);
    });

    it('returns an error if it cant be solved', function() {
      var unsolvedBrokenBoard = new SudokuBoard(helper.unsolvedBrokenArray);
      var err = SudokuSolver.solve(unsolvedBrokenBoard);
      expect(err).to.be.a('string')
      expect(err).to.equal('error: no solution exists')
    });
  });
});
