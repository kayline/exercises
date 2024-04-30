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
  let result = Object.fromEntries(Object.keys(graph).map(node => [node, []]));

  for (let source of Object.keys(graph)) {
    let tos = graph[source];
    for (let to of tos) {
      result[to].push(source);
    }
  }

  return result  
}

function getInDegrees(graph) {
  let result = Object.fromEntries(Object.keys(graph).map(node => [node, []]));

  for (let source of Object.keys(graph)) {
    let tos = graph[source];
    for (let to of tos) {
      result[to] += 1;
    }
  }
  return result  
}

function getSourceNodes(graph) {
  let degrees = Object.fromEntries(Object.keys(graph).map(node => [node, 0]));
  getInDegrees(graph, degrees);
  return Object.keys(degrees).filter(node => degrees[node] === 0);
}

module.exports = {
  graphToAdjacencyList,
  graphToReverseAdjacencyList,
  getInDegrees,
  getSourceNodes,
}