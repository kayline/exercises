require_relative 'binary_search_tree'

# The idea behind an AVL tree is to guarantee that the
# difference in height between any node's left and right
# sub-trees is never greater than 1.
#
# Inserting or deleting might cause this to happen, so
# after either operation we check and perform a series
# of "tree rotations" to keep the tree balanced.
#
# See: https://en.wikipedia.org/wiki/Tree_rotation
#
# This is a right rotation about B:
#   B              D
#  / \            / \
# a   D    ->    B   E
#    / \        / \
#   c   E      a   c
#
# This is a left rotation about D:
#     D          B
#    / \        / \
#   B   e  ->  A   D
#  / \            / \
# A   c          c   e
#
# There are four ways a tree can be unbalanced:
# For a visualization: https://en.wikipedia.org/wiki/Tree_rotation#/media/File:Tree_Rebalancing.gif

# This doesn't NEED to inherit from BinarySearchTree, but if
# you've already implemented it this might save you some time.
#
# Add whatever other classes you find useful.
class AVLTree < BinarySearchTree
  def insert(tree)
    super
    # self.rebalance
  end

  def rebalance
    puts "Rebalancing"
    if self.empty?
      puts "Empty tree"
      return self
    end

    if @left.height > @right.height + 1
      puts "Performing a right rotation from"
      # self.rotate_right
      # puts self.to_string
      # # self.rebalance
    elsif @right.height > @left.height + 1
      puts "Performing a left rotation from"
      # puts self.to_string
      # @left.rotate_left
      # puts self.to_string
      # # self.rebalance
    else
      puts "Balanced"
      return self
    end
  end

  def rotate_right
    @right.right = @right.empty? ? EMPTY_TREE : AVLTree.new(@right.value, @right.left, @right.right)
    @right.left = @left.right.empty? ? EMPTY_TREE : AVLTree.new(@left.right.value, @left.right.left, @left.right.right)
    @right.value = @value
    @value = @left.value
    @left = @left.left.empty? ? EMPTY_TREE : AVLTree.new(@left.left.value, @left.left.left, @left.left.right)
  end

  def rotate_left
    @left.left = @left.empty? ? EMPTY_TREE : AVLTree.new(@left.value, @left.left, @left.right)
    @left.right = @right.left.empty? ? EMPTY_TREE : AVLTree.new(@right.left.value, @right.left.left, @right.left.right)
    @left.value = @value
    @value = @right.value
    @right = @right.right.empty? ? EMPTY_TREE : AVLTree.new(@right.right.value, @right.right.left, @right.right.right)
  end
end


tree = AVLTree.new(10, AVLTree.new(3, AVLTree.new(2), AVLTree.new(7)) , AVLTree.new(25))
puts tree.to_string
tree.insert(AVLTree.new(5))
puts tree.to_string
tree.rotate_left
puts tree.to_string
tree.rotate_right
puts tree.to_string
