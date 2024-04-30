/**
 * Simulate the flood fill algorithm used in graphic applications like MS-Paint. Given a 2D screen
 * represented by an MxN array where each number represents a different color, a start pixel, and
 * a new color, replace the color of the given pixel and all adjacent same colored pixels with the
 * new color.
 *
 * For example, on a screen with the following configuration, and start pixel (0, 1) and new color 3,
 * the screen should change as follows:
 * Initial Screen:
 * [
 *   [1, 1, 0],
 *   [1, 2, 1],
 *   [0, 1, 1]
 * ]
 * Resulting Screen:
 * [
 *   [3, 3, 0],
 *   [3, 2, 1],
 *   [0, 1, 1]
 * ]
 */
function floodFill(screen, startX, startY, newColor) {
  let queue = [[startX, startY]];
  let originalColor = screen[startX][startY];
  while (!queue.length === 0) {
    let [x,y] = queue.shift();
    screen[x][y] = newColor;
    if(screen[x+1][y]=== originalColor) {     
      queue.push([x+1, y]);
    }
    if(screen[x-1][y]=== originalColor) {     
      queue.push([x-1, y]);
    }
    if(screen[x][y+1]=== originalColor) {     
      queue.push([x, y+1]);
    }
    if(screen[x][y-1]=== originalColor) {     
      queue.push([x, y-1]);
    }
  }
}

module.exports = {
  floodFill,
}
