class TreeNode {
  constructor(value, left = null, right = null) {
    this.value = value;
    this.left = left;
    this.right = right;
  }
}

function tree(value, left = null, right = null) {
  return new TreeNode(value, left, right);
}

/**
 * Given a binary tree, returns `true` if it's a valid binary searcch tree
 * and `false` otherwise.
 *
 * @param {TreeNode} tree - The root node of the binary tree.
 * @returns {boolean} - `true` if `tree` is a valid BST and `false` otherwise.
 */
function isValidBST(tree) {
  if(tree.left == null && tree.right == null) {
    return true
  }

  if(tree.left) {
    if(tree.left.value > tree.value || !isValidBST(tree.left)) {
      return false
    }
  }
  
  if(tree.right) {
    if(tree.right.value < tree.value || !isValidBST(tree.right))
      return false
  }

  return true
}

if (require.main === module) {
  let validBST1 = tree(2, tree(1), tree(3));
  let validBST2 = tree(5, tree(3, tree(1), tree(4)), tree(6, null, tree(7)));
  let invalidBST = tree(5, tree(3, tree(2)), tree(1));
  console.log("Tree 1 is valid: ", isValidBST(validBST1));
  console.log("Tree 2 is valid: ", isValidBST(validBST2));
  console.log("Invalid is valid: ", isValidBST(invalidBST));

}
