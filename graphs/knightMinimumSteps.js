/**
 * Given a square chessboard of N x N size, find the minimum number of steps a Knight will take
 * to reach from a given starting position to a target position. The positions are given as
 * (x, y) coordinates on the chessboard.
 */

function validLocation(position, boardSize) {
  return position[0] < boardSize && position[0] >= 0 && position[1] < boardSize && position[1] >= 0;
}

function knightMinimumSteps(chessboardSize, startPos, targetPos) {
  let distance = {};
  distance[startPos] = 0;
  let queue = [startPos];
  let visited = new Set();
  let moves = [
        [1, 2], [2, 1], [-1, 2], 
        [-2, 1], [-1, -2], [-2, -1], 
        [1, -2], [2, -1]
  ];
  while(queue.length > 0) {
    location = queue.shift();
    visited.add(location.toString());
    
    if(location.toString() === targetPos.toString()) {
      console.log(distance);
      return distance[location];
    }
    for(move of moves) {
      let newLocation = [location[0] + move[0], location[1] + move[1]];
      // console.log(newLocation);
      if(validLocation(newLocation, chessboardSize) && !visited.has(newLocation.toString())) {
        distance[newLocation] = distance[location] + 1;
        queue.push(newLocation);
      }  
    }
  }
  
  return Infinity;
}

module.exports = {
  knightMinimumSteps,
}

let steps = knightMinimumSteps(8, [0,0],[7,7]);
console.log(steps);
