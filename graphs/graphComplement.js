/**
 * Given a directed graph, represented as an adjacency list, return its graph complement.
 * The graph complement contains the same vertexes, but has an edge exactly where the
 * original graph lacks an edge (and vice versa).
 *
 * See: https://en.wikipedia.org/wiki/Complement_graph
 *
 * Assume graphs can't contain self-loops, so neither the original nor the complement
 * has any.
 *
 * For example, if your graph looks like:
 *   A -> [B]
 *   B -> [C]
 *   C -> []
 *
 * Then the complement is
 *   A -> [C]
 *   B -> [A]
 *   C -> [B, A]
 */
const { graphBFSFromNode, graphBFS } = require('./graphBFS');

function assignComplementEdges(node, graph, nodes, result) {
  for (let edgeNode of nodes) {
    if(!graph[node].includes(edgeNode)) {
      result[node].push(edgeNode);
    }
  }
}

function graphComplement(graph) {
  let result = Object.fromEntries(Object.keys(graph).map(node => [node, []]))
  let nodes = Object.keys(graph);
  graphBFS(graph, node => assignComplementEdges(node, graph, nodes, result));
  return result;
}

module.exports = {
  graphComplement,
}
