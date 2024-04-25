/**
 * Given a graph G, represented as an adjacency list, and a non-negative integer k
 * calculate the kth graph power of G, denoted G^k.
 *
 * See: https://en.wikipedia.org/wiki/Graph_power
 *
 * G^k has the same vertexes as G, but has an edge (u,v) if there's a path no
 * longer than k from u to v.
 */
const { graphDFSFromNode, graphDFS } = require('./graphDFS');
const { graphToAdjacencyList, graphToReverseAdjacencyList, getInDegrees, getSourceNodes } = require('./graphUtils');

function addEdges(startNodes, endNode, result) {
  for(let startNode of startNodes) {
    if(!result[startNode].includes(endNode)) {
      // console.log("Adding the end node ", endNode);
      // console.log("to existing list ", result[startNode]);
      // console.log("for start node ", startNode);
      result[startNode].push(endNode);      
    }
  }
}

function addToCurrentPath(node, nodesInPath) {
  nodesInPath.push(node);
}

function addEdgesForPathUnderLength(node, nodesInPath, result, maxLength) {
  nodesInPath.pop();
  let eligibleNodes = nodesInPath.slice(-maxLength); 
  addEdges(eligibleNodes, node, result);   
}

function graphPower(graph, k) {
  let nodesInPath = [];
  let result = Object.fromEntries(Object.keys(graph).map(node => [node, []]));
  let sourceNodes = getSourceNodes(graph);
  let callbacks = {
    preOrderCallback: function(node) {addToCurrentPath(node, nodesInPath)},
    postOrderCallback: function(node) {addEdgesForPathUnderLength(node, nodesInPath, result, k)},
  };
  for (let startNode of sourceNodes) {
    nodesInPath = [];
    graphDFSFromNode(graph, startNode, callbacks);
  }
  return result;
}

module.exports = {
  graphPower,
}
