var emptyArray = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0]
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

var correctArrayClone = [
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

var correctArrayAfterGetCols = [
  [1, 6, 8, 2, 3, 5, 7, 9, 4],
  [3, 7, 9, 8, 4, 6, 1, 5, 2],
  [5, 4, 2, 9, 7, 1, 8, 3, 6],
  [8, 3, 1, 4, 5, 7, 6, 2, 9],
  [4, 9, 5, 1, 6, 2, 3, 8, 7],
  [6, 2, 7, 3, 8, 9, 4, 1, 5],
  [2, 5, 3, 6, 1, 4, 9, 7, 8],
  [9, 8, 4, 7, 2, 3, 5, 6, 1],
  [7, 1, 6, 5, 9, 8, 2, 4, 3]
];

var correctArrayAfterGetBoxes = [
  [1, 3, 5, 6, 7, 4, 8, 9, 2],
  [8, 4, 6, 3, 9, 2, 1, 5, 7],
  [2, 9, 7, 5, 8, 1, 3, 4, 6],
  [2, 8, 9, 3, 4, 7, 5, 6, 1],
  [4, 1, 3, 5, 6, 8, 7, 2, 9],
  [6, 7, 5, 1, 2, 9, 4, 3, 8],
  [7, 1, 8, 9, 5, 3, 4, 2, 6],
  [6, 3, 4, 2, 8, 1, 9, 7, 5],
  [9, 5, 2, 7, 6, 4, 8, 1, 3]
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

var unsolvedHARDArray2 = [
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

var emptyBoardToString =
  '0 0 0 0 0 0 0 0 0 \n' +
  '0 0 0 0 0 0 0 0 0 \n' +
  '0 0 0 0 0 0 0 0 0 \n' +
  '0 0 0 0 0 0 0 0 0 \n' +
  '0 0 0 0 0 0 0 0 0 \n' +
  '0 0 0 0 0 0 0 0 0 \n' +
  '0 0 0 0 0 0 0 0 0 \n' +
  '0 0 0 0 0 0 0 0 0 \n' +
  '0 0 0 0 0 0 0 0 0 \n';

module.exports = {
  emptyArray: emptyArray,
  correctArray: correctArray,
  correctArrayClone: correctArrayClone,
  correctArrayAfterGetCols: correctArrayAfterGetCols,
  correctArrayAfterGetBoxes: correctArrayAfterGetBoxes,
  incorrectArray: incorrectArray,
  unsolvedArray: unsolvedArray,
  unsolvedInputArray: unsolvedInputArray,
  unsolvedBrokenArray: unsolvedBrokenArray,
  unsolvedHARDArray: unsolvedHARDArray,
  correctHARDArray: correctHARDArray,
  emptyBoardToString: emptyBoardToString
}
