/**
 * Given a directed graph, determine whether it's a tree or not. A directed graph is a tree if
 * the following two conditions hold:
 *
 * 1. There's exactly one vertex from which every other vertex is reachable
 * 2. No vertex is reachable in two different ways, i.e., via two different paths
 */
const { _, __, getInDegrees, ___ } = require('./graphUtils');
const { dijkstra } = require('./dijkstra');

function allReachable(distanceMap) {
	return !Object.values(distanceMap).includes(Infinity);
}

function graphIsTree(graph) {
	let allReachableFrom = []
	for (let node of Object.keys(graph)) {
		console.log("Looking for all shortest paths from ", node);
		let [shortestPaths, parents] = dijkstra(graph, node);
		if(allReachable(shortestPaths)) {
			allReachableFrom.push(node);
		}
	}
	
	let degrees = getInDegrees(graph)
 	let maxInDegree = Math.max.apply(Math, Object.values(degrees));

 	console.log("The vertexes that can reach all others are: ", allReachableFrom);
 	console.log("The max incoming degree of any vertex is: ", maxInDegree);

 	return allReachableFrom.length === 1 && maxInDegree === 1;
}

module.exports = {
	graphIsTree,
}
