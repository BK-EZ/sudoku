var expect = require('chai').expect;
var SudokuBoard = require('../../sudoku-board').SudokuBoard;
var helper = require('./helper');

describe('SudokuBoard', function() {
  var correctBoard = new SudokuBoard(helper.correctArray);
  var incorrectBoard = new SudokuBoard(helper.incorrectArray);
  var unsolvedBoard = new SudokuBoard(helper.unsolvedArray);
  var unsolvedBrokenBoard = new SudokuBoard(helper.unsolvedBrokenArray);
  var unsolvedHARDBoard = new SudokuBoard(helper.unsolvedHARDArray);

  describe('constructor', function() {
    var emptyBoard = new SudokuBoard(helper.emptyArray);
    var correctBoard = new SudokuBoard(helper.correctArray);

    it('should create a board with a boardArray property', function() {
      expect(emptyBoard).to.have.property('boardArray');
      expect(correctBoard).to.have.property('boardArray');
    });

    it('should provide the boardArray property with an array of 9 elements (9 rows)', function() {
      expect(emptyBoard.boardArray).to.have.lengthOf(9);
      expect(correctBoard.boardArray).to.have.lengthOf(9);
    });

    it('should provide each element of the boardArray array with an inner array of 9 elements (9 cols)', function() {
      for (var row of emptyBoard.boardArray) {
        expect(row).to.have.lengthOf(9);
      }

      for (var row of correctBoard.boardArray) {
        expect(row).to.have.lengthOf(9);
      }
    });

    it('should provide boardArray with exactly 81 elements', function() {
      var numElements1 = 0;
      for (var row of emptyBoard.boardArray) {
        numElements1 += row.length;
      }
      expect(numElements1).to.be.equal(81);

      var numElements2 = 0;
      for (var row of correctBoard.boardArray) {
        numElements2 += row.length;
      }
      expect(numElements2).to.be.equal(81);
    });

    it('should entirely fill the board with numbers', function() {
      for (var row of emptyBoard.boardArray) {
        for (var num of row) {
          expect(num).to.be.a('number');
        }
      }

      for (var row of correctBoard.boardArray) {
        for (var num of row) {
          expect(num).to.be.a('number');
        }
      }
    });

    it('should use its own copy of 2D array passed into its parameters', function() {
      var correctBoard = new SudokuBoard(helper.correctArray);
      expect(correctBoard.getRows()).to.deep.equal(helper.correctArray);
      correctBoard.boardArray[0][0] = -1;
      expect(correctBoard.getRows()).to.not.deep.equal(helper.correctArray);
      expect(helper.correctArrayClone).to.deep.equal(helper.correctArray);
    });
  });

  describe('#toString()', function() {
    var emptyBoard = new SudokuBoard(helper.emptyArray);

    it('should return the board in the form of a string', function() {
      expect(emptyBoard.toString()).to.be.a('string');
      expect(emptyBoard.toString()).to.equal(helper.emptyBoardToString);
    });
  });

  describe('#getRows()', function() {
    it('should return array of arrays of each row in a SudokuBoard', function() {
      expect(correctBoard.getRows()).to.deep.equal(helper.correctArray);
    });

    it('should return a 2D array equal to the SudokuBoard boardArray property', function() {
      expect(correctBoard.getRows()).to.deep.equal(correctBoard.boardArray);
    });
  });

  describe('#getCols()', function() {
    it('should return an array of arrays of each collumn in a SudokuBoard', function() {
      expect(correctBoard.getCols()).to.deep.equal(helper.correctArrayAfterGetCols);
    });
  });

  describe('#getBoxes()', function() {
    it('should return an array of arrays of each "box" of the SudokuBoard', function() {
      expect(correctBoard.getBoxes()).to.deep.equal(helper.correctArrayAfterGetBoxes);
    });
  });

  xdescribe('#insert()', function() {
    var unsolvedSudokuBoard = new SudokuBoard(helper.unsolvedInputArray);

    it('should replace blanks with numbers from an array', function() {
      var arr = [9, 2, 5, 9, 7];
      unsolvedSudokuBoard.insert(arr);
      expect(helper.unsolvedInputArray).to.deep.equal(helper.unsolvedArray);
      expect(unsolvedSudokuBoard.getRows()).to.deep.equal(helper.correctArray);
      expect(helper.unsolvedInputArray).to.deep.equal(helper.unsolvedArray);
    });
  });

  describe('#arraySatisfiesSolution()', function() {
    it('returns true if all elements are unique and inclusively between 1 and 9', function() {
      var arr1 = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      expect(SudokuBoard.arraySatisfiesSolution(arr1)).to.equal(true);

      var arr2 = [9, 2, 3, 4, 5, 6, 7, 8, 1];
      expect(SudokuBoard.arraySatisfiesSolution(arr2)).to.equal(true);

      var arr3 = [1, 3, 2, 4, 5, 7, 6, 8, 9];
      expect(SudokuBoard.arraySatisfiesSolution(arr3)).to.equal(true);
    });

    it('returns false if there are not exactly 9 elements', function() {
      var arr1 = [1, 2, 3, 4, 5, 6, 7, 8];
      expect(SudokuBoard.arraySatisfiesSolution(arr1)).to.equal(false);

      var arr2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      expect(SudokuBoard.arraySatisfiesSolution(arr2)).to.equal(false);

      var arr3 = [1];
      expect(SudokuBoard.arraySatisfiesSolution(arr3)).to.equal(false);

      var arr4 = [];
      expect(SudokuBoard.arraySatisfiesSolution(arr4)).to.equal(false);
    });

    it('returns false if not all elements are unique', function() {
      var arr1 = [1, 2, 3, 4, 5, 7, 7, 8, 9];
      expect(SudokuBoard.arraySatisfiesSolution(arr1)).to.equal(false);

      var arr2 = [1, 1, 1, 1, 1, 1, 1, 1, 1];
      expect(SudokuBoard.arraySatisfiesSolution(arr2)).to.equal(false);
    });

    it('returns false if any elements are not inclusively between 1 and 9', function() {
      var arr1 = [0, 2, 3, 4, 5, 6, 7, 8, 9];
      expect(SudokuBoard.arraySatisfiesSolution(arr1)).to.equal(false);

      var arr2 = [1, 2, 3, 4, 5, 6, 7, 8, 10];
      expect(SudokuBoard.arraySatisfiesSolution(arr2)).to.equal(false);

      var arr3 = [1, 2, 3, 4, 20, 6, 7, 8, 10];
      expect(SudokuBoard.arraySatisfiesSolution(arr3)).to.equal(false);

      var arr4 = [1, 2, -3, 4, 5, 6, 7, 8, 10];
      expect(SudokuBoard.arraySatisfiesSolution(arr4)).to.equal(false);
    });
  });

  describe('#allRowsSatisfySolution()', function() {
    it('returns true if all rows satisfy solution', function() {
      var result = correctBoard.allRowsSatisfySolution();
      expect(result).to.equal(true);
    });

    it('returns true if any rows fail to satisfy solution', function() {
      var result = incorrectBoard.allRowsSatisfySolution();
      expect(result).to.equal(false);
    });
  });

  describe('#allColsSatisfySolution()', function() {
    it('returns true if an entire board is correct (only checking cols)', function() {
      var result = correctBoard.allColsSatisfySolution();
      expect(result).to.equal(true);
    });

    it('returns false if an entire board is incorrect (only checking cols)', function() {
      var result = incorrectBoard.allColsSatisfySolution();
      expect(result).to.equal(false);
    });
  });

  describe('#allBoxesSatisfySolution()', function() {
    it('returns true if an entire board is correct (only checking boxes)', function() {
      var result = correctBoard.allBoxesSatisfySolution();
      expect(result).to.equal(true);
    });

    it('returns false if an entire board is incorrect (only checking boxes)', function() {
      var result = incorrectBoard.allBoxesSatisfySolution();
      expect(result).to.equal(false);
    });
  });

  describe('#isSolved()', function() {
    it('returns true if everything is correct', function(){
      var result = correctBoard.isSolved();
      expect(result).to.equal(true);
    });

    it('returns false if anything is incorrect', function(){
      var result = incorrectBoard.isSolved();
      expect(result).to.equal(false);
    });
  })
});
