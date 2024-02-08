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
  def remove(value_to_remove)
    new_tree = nil
    if value_to_remove < @value
      new_tree = AVLTree(@value, @left.remove(value_to_remove), @right)
    elsif value_to_remove > @value
      new_tree = AVLTree(@value, @left, @right.remove(value_to_remove))
    elsif @left.empty?
      new_tree = @right
    elsif @right.empty?
      new_tree = @left
    else
      left_max = @left.max
      new_tree = AVLTree(left_max, @left.remove(left_max), @right)
    end

    new_tree.rebalance
  end

  def insert(new_value)
    new_tree = nil
    case new_value <=> @value
    when -1
      new_tree = AVLTree(@value, @left.insert(new_value), @right)
    when 0
      new_tree = self
    when 1
      new_tree = AVLTree(@value, @left, @right.insert(new_value))
    end
    new_tree.rebalance
  end

  def rebalance
    if self.empty?
      puts "Empty tree"
      return self
    end

    if self.left_left?
      puts "Performing a single right rotation"
      puts self.to_string
      self.rotate_right
    elsif self.right_right?
      puts "Performing a single left rotation"
      puts self.to_string
      self.rotate_left
    elsif self.left_right?
      puts "Performing a left rotation on the left branch"
      puts self.to_string
      @left.rotate_left
      puts "Performing a right rotation on whole tree"
      puts self.to_string
      self.rotate_right
    elsif self.right_left?
      puts "Performing a right rotation on the right branch"
      puts self.to_string
      @right.rotate_right
      puts "Performing a left rotation on whole tree"
      puts self.to_string
      self.rotate_left
    else
      self
    end
  end

  def left_left?
    (@left.height > @right.height + 1) && (@left.left.height > @left.right.height)
  end

  def right_right?
    (@right.height > @left.height + 1) && (@right.right.height > @right.left.height)
  end

  def left_right?
    (@left.height > @right.height + 1) && (@left.left.height < @left.right.height)
  end

  def right_left?
    (@right.height > @left.height + 1) && (@right.right.height < @right.left.height)
  end

  def rotate_right
    AVLTree(@left.value, @left.left, AVLTree(@value, @left.right, @right))
    # @right.right = @right.empty? ? EMPTY_TREE : AVLTree.new(@right.value, @right.left, @right.right)
    # @right.left = @left.right.empty? ? EMPTY_TREE : AVLTree.new(@left.right.value, @left.right.left, @left.right.right)
    # @right.value = @value
    # @value = @left.value
    # @left = @left.left.empty? ? EMPTY_TREE : AVLTree.new(@left.left.value, @left.left.left, @left.left.right)
  end

  def rotate_left
    AVLTree(@right.value, AVLTree(@value, @left, @right.left), @right.right)
  end
end

def AVLTree(value, left = nil, right = nil)
  case value
  when AVLTree
    value
  when nil
    EMPTY_TREE
  else
    AVLTree.new(value, left, right)
  end
end



tree = AVLTree.new(1)
(1..4).each do |val|
  # puts tree.to_string
  tree = tree.insert(val)
  puts tree.to_string
end
tree = tree.insert(5)
puts tree.to_string
tree = tree.remove(2)
puts tree.to_string
tree = tree.remove(1)
puts tree.to_string

# # #Left left case
# tree.insert(1)
# tree.remove(1)
# puts tree.to_string
#
# puts "*" * 80
#
# #Right right case
# tree.insert(27)
# tree.insert(42)
# tree.insert(50)
# tree.remove(50)
# tree.remove(42)
# tree.remove(27)
#
# # puts tree.to_string
# # tree.rebalance
#
# # # Left right
# tree.insert(5)
# tree.remove(5)
#
# # puts tree.to_string
# # tree.rebalance
#
# #Right right case
# tree.insert(27)
# tree.insert(42)
# tree.insert(35)
#

