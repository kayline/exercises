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

function listForEachRecursive(head, callback = doNothing) {

}

function listForEachIterative(head, callback = doNothing) {

}

function binaryTreeDFSRecursive(root, callback = doNothing) {

}

function binaryTreeDFSIterative(root, callback = doNothing) {

}

function binaryTreeBFSIterative(root, callback = doNothing) {

}

function graphDFSRecursive(graph, start, callback = doNothing) {

}

function graphDFSIterative(graph, start, callback = doNothing) {

}

function graphBFSIterative(graph, start, callback = doNothing) {

}
