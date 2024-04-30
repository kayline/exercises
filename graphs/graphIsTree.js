/**
 * Given a directed graph, determine whether it's a tree or not. A directed graph is a tree if
 * the following two conditions hold:
 *
 * 1. There's exactly one vertex from which every other vertex is reachable
 * 2. No vertex is reachable in two different ways, i.e., via two different paths
 */
function allReachable(distanceMatrix) {
	return distanceMatrix.filter(distanceArray => distanceArray.includes(Infinity)).length === 0;
}

function graphIsTree(graph) {
	let allReachableFrom = []
	for (let node of Object.keys(graph)) {
		let shortestPaths = dijkstra(graph, node);
		if(allReachable(shortestPaths)) {
			allReachableFrom.push(node);
		}
	}
	
	let degrees = getInDegrees(graph)
 	let maxInDegree = Object.values(degrees).max();

 	return allReachableFrom.length === 1 && maxInDegree === 1;
}
