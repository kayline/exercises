/**
 * Given a graph represented as a vertex list and an edge list,
 * return an adjacency list that represents the same graph
 */
function graphToAdjacencyList(vertexList, edgeList) {
  const adjacencyList = {};

  for (let vertex of vertexList) {
    adjacencyList[vertex] = [];
  }

  for (let [from, to] of edgeList) {
    adjacencyList[from].push(to);
  }

  return adjacencyList;
}

function graphToReverseAdjacencyList(vertexList, edgeList) {
  for (let vertex of vertexList) {
    adjacencyList[vertex] = [];
  }

  for (let [from, to] of edgeList) {
    adjacencyList[to].push(from);
  }

  return adjacencyList;
}

function reverseGraph(graph) {
  let result = {};

  for (let vertex of Object.keys(graph)) {
    result[vertex] = [];
  }

  for (let source of Object.keys(graph)) {
    let tos = graph[source];
    for (let to of tos) {
      result[to].push(source);
    }
  }

  return result  
}

function getInDegrees(graph) {
  let result = {};

  for (let vertex of Object.keys(graph)) {
    result[vertex] = 0;
  }

  for (let source of Object.keys(graph)) {
    let tos = graph[source];
    for (let to of tos) {
      result[to] += 1;
    }
  }
  return result  
}

function visitConnectedNodes(graph, start, callback, visited = new Set()) {
  if (visited.has(start)) {
    return
  }
  visited.add(start);
  let neighbors = graph[start];
  for (let neighbor of neighbors) {
    visitConnectedNodes(graph, neighbor, callback, visited)
  }
  callback(start)
}

function dfs(graph, callback) {
  let visited = new Set();
  for (let vertex of Object.keys(graph)) {
    visitConnectedNodes(graph, vertex, callback, visited)
  }
}

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

// let vertexList = ['B', 'C', 'D', 'E', 'A', 'F'];
// let edgeList = [
//   ['B', 'A'],
//   ['A', 'C'],
//   ['C', 'D'],
//   ['D', 'B'],
//   ['D', 'E'],
//   ['F', 'C'],
// ]

// let graph = graphToAdjacencyList(vertexList, edgeList);
// console.log(graph);
// console.log(getInDegrees(graph));
// console.log('Sorted:', topologicalSort(graph));
// dfs(graph, console.log);
