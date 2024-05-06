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
    callback(current);
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

  callback(head);

  listForEachRecursive(head.next, callback);
}

/**
 * Traverse a binary tree, recursively and depth-first
 *
 * The callback can be invoked in any order, but only once per node
 */
function binaryTreeDFSRecursive(root, callback = doNothing) {

}

/**
 * Traverse a binary tree, iteratively and depth-first
 *
 * The callback can be invoked in any order, but only once per node
 */
function binaryTreeDFSIterative(root, callback = doNothing) {

}

/**
 * Traverse a binary tree, iteratively and breadth-first
 *
 * The callback can be invoked in any order, but only once per node
 */
function binaryTreeBFSIterative(root, callback = doNothing) {

}

/**
 * Traverse a graph given a starting node, recursively and depth-first
 *
 * The callback can be invoked in any order, but only once per node
 */
function graphDFSRecursive(graph, start, callback = doNothing) {

}

/**
 * Traverse a graph given a starting node, iteratively and depth-first
 *
 * The callback can be invoked in any order, but only once per node
 */
function graphDFSIterative(graph, start, callback = doNothing) {

}

/**
 * Traverse a graph given a starting node, iteratively and breadth-first
 *
 * The callback can be invoked in any order, but only once per node
 */
function graphBFSIterative(graph, start, callback = doNothing) {

}
