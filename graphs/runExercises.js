const { graphDirectedToUndirected } = require('./graphDirectedToUndirected');
const { graphShortestPath } = require('./graphShortestPath');
const { graphComplement } = require('./graphComplement');
const { graphTranspose } = require('./graphTranspose');

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

let vertexList = ['B', 'C', 'D', 'E', 'A', 'F'];
let edgeList = [
  ['B', 'A'],
  ['A', 'C'],
  ['C', 'D'],
  ['D', 'B'],
  ['D', 'E'],
  ['F', 'C'],
]

let graph = graphToAdjacencyList(vertexList, edgeList);
console.log(graph);
// let undirected = graphDirectedToUndirected(graph);
// console.log(undirected);

// let shortestPath = graphShortestPath(graph, "C", "E");
// console.log("The shortest path from C to E is ", shortestPath);

// let complement = graphComplement(graph);
// console.log(complement);

let transpose = graphTranspose(graph);
console.log(transpose);