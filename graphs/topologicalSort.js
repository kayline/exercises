/**
 * Given a graph represented as a vertex list and an edge list,
 * return an adjacency list that represents the same graph
 */

const { _, __, getInDegrees, ___ } = require('./graphUtils');

function topologicalSort(graph) {
  let sortedNodes = []
  let inDegrees = getInDegrees(graph);
  let sources = Object.keys(inDegrees).filter(v => inDegrees[v] == 0)
  while (sources.length > 0) {
    let source = sources.shift();
    sortedNodes.push(source)
    for (let neighbor of graph[source]) {
      inDegrees[neighbor] -= 1;
      if (inDegrees[neighbor] === 0) {
        sources.push(neighbor);
      }
    }
  }

  if (Object.values(inDegrees).every(v => v === 0)) {
    return sortedNodes;
  } else {
    return null;
  }
}

module.exports = {
  topologicalSort,
}