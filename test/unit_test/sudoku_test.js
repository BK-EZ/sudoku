var expect = require('chai').expect;
var Sudoku = require('../../sudoku').Sudoku;
var checkArrayWorks = require('../../sudoku').checkArrayWorks;
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

var emptyTable = new Sudoku(allRowsEmpty); // creates the object
var correctTable = new Sudoku(correctArray); // creates the object
var incorrectTable = new Sudoku(incorrectArray); // creates the object


describe('Soduko', function(){
  describe('creating sudoku tables', function () {
    it('table should have 9 rows', function(){
      expect(emptyTable.allRows.length).to.equal(9);
    });
    it('each row should have 9 values', function(){
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
    it('each value in a row is between 0 and 9', function(){
      for(var y = 0; y < 9; y++){
        for(var x = 0; x < 9; x++){
          expect(emptyTable.allRows[y][x]).to.equal(0);
        }
      }
    })
  });
  describe('displaying sudoku table in the form of a grid', function(){
    it('should display as a grid', function(){
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
  describe('getCols', function(){
    it('returns an array of arrays of each collumn in a Sudoku table', function(){
        var colsArr = correctTable.getCols();
        expect(colsArr).to.equal()
    });
  });
  describe('checking if table is correct', function(){
    describe('checking rows', function(){
      it('returns true if a specific row is correct', function(){
        var newRow = [1,2,3,4,5,6,7,8,9];
        expect(checkArrayWorks(newRow)).to.equal(true);
      });
      it('returns false if a specific row is incorrect', function(){
        var newRow = [1,2,3,4,5,7,7,8,9];
        expect(checkArrayWorks(newRow)).to.equal(false);
      });
      it('returns true if an entire board is correct (only checking rows)', function(){
        var result = correctTable.checkAllRows();
        expect(result).to.equal(true);
      });
      it('returns false if an entire board is incorrect (only checking rows)', function(){
        var result = incorrectTable.checkAllRows();
        expect(result).to.equal(false);
      });

    });
  });
});
