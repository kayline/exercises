// let { graphBFSFromNode, graphBFS } = require('./graphBFS');

// /**
//  * Given a graph, a starting node `startNode`, and an ending node `endNode`,
//  * find the shortest path from `startNode` to `endNode`.
//  */
// function pathLengthWhenDetected(graph, node, endNode, currentPathLength, shortestPath) {
// 	currentPathLength += 1;
// 	console.log("Checking node ", node)
// 	console.log("Edges for this node", graph[node]);
// 	console.log("Current path length ", currentPathLength);
// 	console.log("Shortest path is currently ", shortestPath);
// 	if (graph[node].includes(endNode)) {
// 		console.log("Found the end node at path length ", currentPathLength);
// 		shortestPath = currentPathLength;
// 		console.log("Set the shortest path to ", shortestPath);
// 		return;
// 	}	
// }

// function graphShortestPath(graph, startNode, endNode) {
// 	let currentPathLength;
// 	let result;
// 	currentPathLength = 0;
// 	console.log("how many times am I here");
// 	graphBFS(graph, node => pathLengthWhenDetected(graph, node, endNode, currentPathLength, result));
// 	console.log("Final length is ",result);
// 	return result;
// }

// module.exports = {
//   graphShortestPath,
// }

// QUESTIONS: 
// If I pass integer counters to the callback, incrementing does not persist. What am I not understanding about objects vs integers?
// Is there a way, without modifying graphBFS, to have the callback break the traversal as soon as it finds the endNode?

const { graphBFSFromNode, graphBFS } = require('./graphBFS');

function callback(node, graph, endNode, result) {
	result["currentLength"] += 1;
  if (graph[node].includes(endNode)) {
		result["shortestPath"] = result["currentLength"];
	}	
}

function graphShortestPath(graph, startNode, endNode) {
  let result = {
  	currentLength: 0,
  	shortestPath: 0
  };

  graphBFSFromNode(graph, startNode, node => callback(node, graph, endNode, result));
  return result;
}

module.exports = {
  graphShortestPath,
}