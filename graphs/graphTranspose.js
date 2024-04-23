/**
 * Given a directed graph, represented as an adjacency list, return its graph transpose
 * (aka opposite graph). This graph is formed by reversing the direction of all
 * the edges.
 *
 * See: https://en.wikipedia.org/wiki/Transpose_graph
 */

const { _, graphBFS } = require('./graphBFS');

function assignReverseEdges(node, sourceGraph, result) {
  if (sourceGraph[node].length > 0) {
    for(let connectedVertex of sourceGraph[node]) {
      if (!result[connectedVertex].includes(node)){
        result[connectedVertex].push(node);
      }   
    }
  }
}

function graphTranspose(graph) {
  let result = Object.fromEntries(Object.keys(graph).map(node => [node, []]))

  graphBFS(graph, node => assignReverseEdges(node, graph, result));
  return result;
}

module.exports = {
  graphTranspose,
}
