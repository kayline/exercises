/**
 * Given a 2D binary matrix of size N * M where '0' represents an empty space and '1' represents
 * a wall, determine the minimum number of steps required to travel from the top left corner (0, 0)
 * to the bottom right corner (N-1, M-1). You are allowed to remove up to K walls. If it is not
 * possible to reach the target, return -1.
 *
 * We'll call K the "removal budget".
 *
 * Example input:
 * matrix: [
 *   [0, 1, 0, 0, 0],
 *   [0, 1, 0, 1, 0],
 *   [0, 1, 0, 1, 0],
 *   [0, 1, 0, 1, 0],
 *   [0, 0, 0, 1, 0]
 * ],
 * k: 2
 * Output: 8 (minimum steps, including wall removals)
 */
function minimumStepsWithWallRemoval(matrix, removalBudget) {
  // Your code goes here.
}

module.exports = {
  minimumStepsWithWallRemoval,
}
