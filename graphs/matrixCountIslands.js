/**
 * Given a 2D binary matrix, find the number of islands. An island is surrounded by water
 * and is formed by connecting adjacent lands horizontally or vertically. You may assume
 * all four edges of the matrix are surrounded by water.
 *
 * For example, the matrix below contains 4 islands:
 * [
 *   [1, 1, 0, 0, 0],
 *   [0, 1, 0, 0, 1],
 *   [0, 0, 0, 1, 1],
 *   [1, 0, 0, 0, 0],
 *   [1, 0, 1, 1, 1]
 * ]
 *
 */
function matrixCountIslands(matrix) {
  let islands = 0;
  let rows = matrix.length;
  let columns = matrix[0].length;

  for (i ) {
    for (j) {
      if(matrix[i,j] === 1) {
        islands +=1;
        floodFill(matrix, i, j, 0);
      }
    }
  }
  return islands;
  // Your code goes here.
}

module.exports = {
  matrixCountIslands,
}
