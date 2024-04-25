const { graphToAdjacencyList, graphToReverseAdjacencyList, getInDegrees } = require('./graphUtils');
const { graphDirectedToUndirected } = require('./graphDirectedToUndirected');
const { graphShortestPath } = require('./graphShortestPath');
const { graphComplement } = require('./graphComplement');
const { graphTranspose } = require('./graphTranspose');
const { graphPathGraph } = require('./graphPathGraph');
const { graphPower } = require('./graphPower');

let vertexList = ['B', 'C', 'D', 'E', 'A', 'F'];
let edgeList = [
  ['A', 'B'],
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

// let transpose = graphTranspose(graph);
// console.log(transpose);

let pathGraph = graphPathGraph(graph);
console.log(pathGraph);

let power = graphPower(graph, 2);
console.log(power);