/**
 * Given a directed graph, represented by an adjacency list, return an undirected graph
 * formed by "forgetting" the directions of the original edges.
 *
 * Do this by creating a new adjacency list where there's an edge in both directions
 * for every edge in the original graph.
 */
const { _, graphBFS } = require('./graphBFS');

function assignEdgePairs(node, sourceGraph, result) {
  if (sourceGraph[node].length > 0) {
    for(let connectedVertex of sourceGraph[node]) {
      if (!result[node].includes(connectedVertex)) {
        result[node].push(connectedVertex);  
      }
      if (!result[connectedVertex].includes(node)){
        result[connectedVertex].push(node);
      }   
    }
  }
}

function graphDirectedToUndirected(graph) {
  let result = Object.fromEntries(Object.keys(graph).map(node => [node, []]));

  graphBFS(graph, node => assignEdgePairs(node, graph, result));
  return result;
}

module.exports = {
  graphDirectedToUndirected,
}