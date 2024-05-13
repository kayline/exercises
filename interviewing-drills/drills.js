function doNothing() {};

class List {
  constructor(value, next = null) {
    this.value = value;
    this.next = next;
  }
}

class BinaryTree {
  constructor(value, left = null, right = null) {
    this.value = value;
    this.left = left;
    this.right = right;
  }
}


/**
 * Traverse a linked list, iteratively
 */
function listForEachIterative(head, callback = doNothing) {
  let current = head;

  while (current !== null) {
    callback();
    current = current.next;
  }
}

/**
 * Traverse a linked list, recursively
 */
function listForEachRecursive(head, callback = doNothing) {
  if (head === null) {
    return;
  }

  callback();

  listForEachRecursive(head.next, callback);
}

/**
 * Traverse a binary tree, recursively and depth-first
 *
 * The callback can be invoked in any order, but only once per node
 */
function binaryTreeDFSRecursive(root, callback = doNothing) {
  if (root === null) {
    return;
  }

  binaryTreeDFSRecursive(root.left, callback);
  binaryTreeDFSRecursive(root.right, callback);

  callback(root.value);
}

/**
 * Traverse a binary tree, iteratively and depth-first
 *
 * The callback can be invoked in any order, but only once per node
 */
function binaryTreeDFSIterative(root, callback = doNothing) {
  queue = [root];

  while (queue.length > 0) {
    node = queue.pop();
    callback(node.value);   
    if (node.right) {
      queue.push(node.right);
    }
    if (node.left) {
      queue.push(node.left);
    }
  }

}

/**
 * Traverse a binary tree, iteratively and breadth-first
 *
 * The callback can be invoked in any order, but only once per node
 */
function binaryTreeBFSIterative(root, callback = doNothing) {
  queue = [root];

  while (queue.length > 0) {
    node = queue.shift();
    callback(node.value);
    if (node.left) {
      queue.push(node.left);
    }
    if (node.right) {
      queue.push(node.right);
    }
  }
}

/**
 * Traverse a graph given a starting node, recursively and depth-first
 *
 * The callback can be invoked in any order, but only once per node
 */
function graphDFSRecursive(graph, start, visited, callback = doNothing) {
  if(!visited.has(start)) {
    callback(start);
    visited.add(start);

    let childNodes = graph[start];  
    if(childNodes.length === 0) {
      return
    }
    
    for (let childNode of childNodes) {
      graphDFSRecursive(graph, childNode, visited, callback);
    }
  }  
}

/**
 * Traverse a graph given a starting node, iteratively and depth-first
 *
 * The callback can be invoked in any order, but only once per node
 */
function graphDFSIterative(graph, start, callback = doNothing) {
  let queue = [start];
  let visited = new Set();

  while(queue.length > 0) {
    node = queue.pop();
    if(!visited.has(node)) {
      visited.add(node);
      callback(node);
      for (let childNode of graph[node]) {
        queue.push(childNode);
      }
    }   
  }
}

/**
 * Traverse a graph given a starting node, iteratively and breadth-first
 *
 * The callback can be invoked in any order, but only once per node
 */
function graphBFSIterative(graph, start, callback = doNothing) {
  let queue = [start];
  let visited = new Set();

  while(queue.length > 0) {
    node = queue.shift();
    if(!visited.has(node)) {
      visited.add(node);
      callback(node);
      for (childNode of graph[node]) {
        queue.push(childNode);
      }
    }
  }
}

function logValue(value) {
  console.log(value);
}

let tree = new BinaryTree(25, new BinaryTree(31, new BinaryTree(33), new BinaryTree(27)), new BinaryTree(12, new BinaryTree(14), new BinaryTree(8)));
let graph = {
  B: [],
  C: [ 'D' ],
  D: [ 'B', 'E' ],
  E: [],
  A: [ 'B', 'C' ],
  F: [ 'C' ]
};
console.log("DFS Recursive");
binaryTreeDFSRecursive(tree, logValue);
console.log("DFS Iterative");
binaryTreeDFSIterative(tree, logValue);
console.log("BFS Iterative");
binaryTreeBFSIterative(tree, logValue);
console.log("DFS Recursive");
graphDFSRecursive(graph, 'A', new Set(), logValue);
console.log("DFS Iterative");
graphDFSIterative(graph, 'A', logValue);
console.log("BFS Iterative");
graphBFSIterative(graph, 'A', logValue);
