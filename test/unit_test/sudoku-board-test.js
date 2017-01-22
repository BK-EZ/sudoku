var expect = require('chai').expect;
var SudokuBoard = require('../../sudoku-board').SudokuBoard;
var helper = require('./helper');

describe('SudokuBoard', function() {

  describe('CONSTRUCTOR', function() {
    it('should create a SudokuBoard object with a boardArray property', function() {
      var sudokuBoard = new SudokuBoard();
      expect(sudokuBoard).to.be.a('object');
      expect(sudokuBoard).to.have.property('boardArray');
    });

    it('should set the boardArray to a 0-filled 2D array if no parameter is given', function() {
      var emptyBoard = new SudokuBoard();
      expect(emptyBoard.boardArray).to.deep.equal(helper.emptyArray);
    });

    it('should set the boardArray to what is put in params if a param is given', function() {
      var correctBoard = new SudokuBoard(helper.correctArray);
      expect(correctBoard.boardArray).to.deep.equal(helper.correctArray);

      var incorrectBoard = new SudokuBoard(helper.incorrectArray);
      expect(incorrectBoard.boardArray).to.deep.equal(helper.incorrectArray);

      var emptyBoard = new SudokuBoard(helper.emptyArray);
      expect(emptyBoard.boardArray).to.deep.equal(helper.emptyArray);
    })

    it('should provide the boardArray property with an array of 9 elements (9 rows)', function() {
      var sudokuBoard = new SudokuBoard();
      expect(sudokuBoard.boardArray).to.have.lengthOf(9);
    });

    it('should provide each element of the boardArray array with an inner array of 9 elements (9 cols)', function() {
      var sudokuBoard = new SudokuBoard();
      for (var row of sudokuBoard.boardArray) {
        expect(row).to.have.lengthOf(9);
      }
    });

    it('should provide boardArray with exactly 81 elements', function() {
      var sudokuBoard = new SudokuBoard();
      var numElements1 = 0;
      for (var row of sudokuBoard.boardArray) {
        numElements1 += row.length;
      }
      expect(numElements1).to.be.equal(81);

      var correctBoard = new SudokuBoard(helper.correctArray);
      var numElements2 = 0;
      for (var row of sudokuBoard.boardArray) {
        numElements2 += row.length;
      }
      expect(numElements2).to.be.equal(81);
    });

    it('should entirely fill the board with numbers', function() {
      var sudokuBoard = new SudokuBoard();
      for (var row of sudokuBoard.boardArray) {
        for (var num of row) {
          expect(num).to.be.a('number');
        }
      }

      var correctBoard = new SudokuBoard(helper.correctArray);
      for (var row of correctBoard.boardArray) {
        for (var num of row) {
          expect(num).to.be.a('number');
        }
      }
    });

    it('should use its own copy of 2D array passed into its parameters', function() {
      var correctBoard = new SudokuBoard(helper.correctArray);
      expect(correctBoard.boardArray).to.deep.equal(helper.correctArray);
      correctBoard.boardArray[0][0] = -1;
      expect(correctBoard.boardArray).to.not.deep.equal(helper.correctArray);
      expect(helper.correctArray).to.deep.equal(helper.correctArrayClone);
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
      var correctBoard = new SudokuBoard(helper.correctArray);
      expect(correctBoard.getRows()).to.deep.equal(helper.correctArray);
    });

    it('should return a 2D array equal to the SudokuBoard boardArray property', function() {
      var correctBoard = new SudokuBoard(helper.correctArray);
      expect(correctBoard.getRows()).to.deep.equal(correctBoard.boardArray);
    });
  });

  describe('#getCols()', function() {
    it('should return an array of arrays of each collumn in a SudokuBoard', function() {
      var correctBoard = new SudokuBoard(helper.correctArray);
      expect(correctBoard.getCols()).to.deep.equal(helper.correctArrayAfterGetCols);
    });
  });

  describe('#getBoxes()', function() {
    it('should return an array of arrays of each "box" of the SudokuBoard', function() {
      var correctBoard = new SudokuBoard(helper.correctArray);
      expect(correctBoard.getBoxes()).to.deep.equal(helper.correctArrayAfterGetBoxes);
    });
  });

  describe('#insert()', function() {
    it('should replace blanks with numbers from an array', function() {
      var unsolvedSudokuBoard = new SudokuBoard(helper.unsolvedInputArray);
      var arr = [9, 2, 5, 9, 7];
      unsolvedSudokuBoard.insert(arr);
      expect(unsolvedSudokuBoard.getRows()).to.deep.equal(helper.correctArray);
    });

    it('should not affect the input array', function() {
      var unsolvedSudokuBoard = new SudokuBoard(helper.unsolvedInputArray);
      var arr = [9, 2, 5, 9, 7];
      var arrClone = [9, 2, 5, 9, 7];
      expect(arr).to.deep.equal(arrClone);
      unsolvedSudokuBoard.insert(arr);
      expect(arr).to.deep.equal(arrClone);
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
      var correctBoard = new SudokuBoard(helper.correctArray);
      var result = correctBoard.allRowsSatisfySolution();
      expect(result).to.equal(true);

      var correctBoard = new SudokuBoard(helper.correctHARDArray);
      var result = correctBoard.allRowsSatisfySolution();
      expect(result).to.equal(true);
    });

    it('returns true if any rows fail to satisfy solution', function() {
      var incorrectBoard = new SudokuBoard(helper.incorrectInputArray);
      var result = incorrectBoard.allRowsSatisfySolution();
      expect(result).to.equal(false);
    });
  });

  describe('#allColsSatisfySolution()', function() {
    it('returns true if an entire board is correct (only checking cols)', function() {
      var correctBoard = new SudokuBoard(helper.correctArray);
      var result = correctBoard.allColsSatisfySolution();
      expect(result).to.equal(true);

      var correctBoard = new SudokuBoard(helper.correctHARDArray);
      var result = correctBoard.allColsSatisfySolution();
      expect(result).to.equal(true);
    });

    it('returns false if an entire board is incorrect (only checking cols)', function() {
      var incorrectBoard = new SudokuBoard(helper.incorrectInputArray);
      var result = incorrectBoard.allColsSatisfySolution();
      expect(result).to.equal(false);
    });
  });

  describe('#allBoxesSatisfySolution()', function() {
    it('returns true if an entire board is correct (only checking boxes)', function() {
      var correctBoard = new SudokuBoard(helper.correctArray);
      var result = correctBoard.allBoxesSatisfySolution();
      expect(result).to.equal(true);

      var correctBoard = new SudokuBoard(helper.correctHARDArray);
      var result = correctBoard.allBoxesSatisfySolution();
      expect(result).to.equal(true);
    });

    it('returns false if an entire board is incorrect (only checking boxes)', function() {
      var incorrectBoard = new SudokuBoard(helper.incorrectInputArray);
      var result = incorrectBoard.allBoxesSatisfySolution();
      expect(result).to.equal(false);
    });
  });

  describe('#isSolved()', function() {
    it('returns true if everything is correct', function() {
      var correctBoard = new SudokuBoard(helper.correctArray);
      var result = correctBoard.isSolved();
      expect(result).to.equal(true);

      var correctBoard = new SudokuBoard(helper.correctHARDArray);
      var result = correctBoard.isSolved();
      expect(result).to.equal(true);
    });

    it('returns false if anything is incorrect', function() {
      var incorrectBoard = new SudokuBoard(helper.incorrectInputArray);
      var result = incorrectBoard.isSolved();
      expect(result).to.equal(false);
    });
  })
});
