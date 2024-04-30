// let { graphBFSFromNode, graphBFS } = require('./graphBFS');

// /**
//  * Given a graph, a starting node `startNode`, and an ending node `endNode`,
//  * find the shortest path from `startNode` to `endNode`.
//  */
const { graphBFSFromNode, graphBFS } = require('./graphBFS');

function callback(node, startNode, graph, distance) {
  if(node != startNode) {
    previousNode = Object.keys(graph).find(k => graph[k].includes(node));
    distance[node] = distance[previousNode] + 1;
  }
}

function graphShortestPath(graph, startNode, endNode) {
  let distance = {};
  distance[startNode] = 0;

  graphBFSFromNode(graph, startNode, node => callback(node, startNode, graph, distance));

  return distance[endNode];
}

module.exports = {
  graphShortestPath,
}