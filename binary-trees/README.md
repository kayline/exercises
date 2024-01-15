# Binary Trees

[binary-tree.js](binary-tree.js) is a complete implementation of a binary tree in JavaScript. Try to extend it into a binary search tree.

In Ruby, there are skeletons for:

- [binary_tree.rb](binary_tree.rb) - A basic binary tree with different traversal methods
- [binary_search_tree.rb](binary_search_tree.rb) - A binary search tree, without any regard for being balanced
- [avl_tree.rb](avl_tree.rb) - An [AVL Tree](https://en.wikipedia.org/wiki/AVL_tree), a type of self-balancing binary search tree that uses [tree rotations](https://en.wikipedia.org/wiki/Tree_rotation) to maintain its balance.

There are other self-balancing binary search trees that also use tree rotations to stay balanced, but decide when and what to rotate with different criteria than an AVL tree. [Red-black Trees](https://en.wikipedia.org/wiki/Red%E2%80%93black_tree) are an example of that.

Understanding red-black trees is helpful, but implementing them is a little tedious. If you understand AVL trees then understanding the pseudocode for red-black tree insertion and deletion is probably enough.
