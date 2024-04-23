/**
 * Given a graph, represented as an adjacency list, iterate through it breadth-first
 * and call the callback for each node.
 */
function graphBFSFromNode(graph, startNode, callback, visited = new Set()) {
  if (visited.has(startNode)) {
    return;
  }
  let queue = [startNode];

  while (queue.length > 0) {
    let node = queue.shift();
    if (!visited.has(node)) {
      visited.add(node);

      if (typeof callback === 'function') {
        callback(node);
      }

      queue.push(...graph[node]);
    }
  }

}

function graphBFS(graph, callback) {
  let visited = new Set()
  for (let node of Object.keys(graph)) {
    graphBFSFromNode(graph, node, callback, visited);
  }
}

module.exports = {
  graphBFSFromNode,
  graphBFS,
}