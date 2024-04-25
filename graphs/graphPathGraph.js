/**
 * Given a graph, represented as an adjacency list, return its path graph.
 *
 * The path graph of a graph G has the same vertexes, but has (u, v) as an
 * edge if there's a path from u to v in the original graph.
 *
 * See: https://en.wikipedia.org/wiki/Path_graph
 */
const { graphDFSFromNode, graphDFS } = require('./graphDFS');
const { graphToAdjacencyList, graphToReverseAdjacencyList, getInDegrees, getSourceNodes } = require('./graphUtils');

function addEdges(startNodes, endNode, result) {
  for(let startNode of startNodes) {
    if(!result[startNode].includes(endNode)) {
      result[startNode].push(endNode);      
    }
  }
}

function addToCurrentPath(node, nodesInPath) {
  nodesInPath.push(node);
}

function addEdgesForPath(node, nodesInPath, result) {
  nodesInPath.pop();
  addEdges(nodesInPath, node, result);
}

function graphPathGraph(graph) {
  let nodesInPath = [];
  let result = Object.fromEntries(Object.keys(graph).map(node => [node, []]));
  let sourceNodes = getSourceNodes(graph);
  let callbacks = {
    preOrderCallback: function(node) {addToCurrentPath(node, nodesInPath)},
    postOrderCallback: function(node) {addEdgesForPath(node, nodesInPath, result)},
  };
  for (let startNode of sourceNodes) {
    nodesInPath = [];
    graphDFSFromNode(graph, startNode, callbacks);
  }
  return result;

}

module.exports = {
  graphPathGraph,
}
