require_relative 'binary_tree'

# Implement a binary search tree.
#
# See http://en.wikipedia.org/wiki/Binary_search_tree
# Operations to support:
#   include?(value)     Average O(height) time
#   insert(value)       Average O(height) time
#   remove(value)       Average O(height) time
#   empty?              O(1) time

class BinarySearchTree < BinaryTree
  def include?(value)
    puts "Current evaluating #{@value}"
    if @value == value
      puts "Match!"
      return true
    elsif @value > value && !@left.nil?
      puts "Too big"
      @left.include?(value)
    elsif !@right.nil?
      puts "Too small"
      @right.include?(value)
    else
      false
    end
  end

  def insert(newLeaf)
    insertionNode = nil
    currentNode = self

    while currentNode != EMPTY_TREE
      insertionNode = currentNode
      if newLeaf.value < currentNode.value
        currentNode = currentNode.left
      else
        currentNode = currentNode.right
      end
    end
    if insertionNode.empty?
      self.value = newLeaf.value
    elsif newLeaf.value < insertionNode.value
      insertionNode.left = newLeaf
    else
      insertionNode.right = newLeaf
    end
  end

  def remove(value_to_remove)
    if @value == value_to_remove
      self.remove_node
    elsif value_to_remove < @value
      @left.remove(value_to_remove)
    else
      @right.remove(value_to_remove)
    end
  end

  def remove_node
    if @left.empty? && @right.empty?
      return EMPTY_TREE
    elsif @left.empty?
      @value = @right.value
      @left = @right.left
      @right = @right.right
    elsif @right.empty?
      @value = @left.value
      @left = @left.left
      @right = @left.right
    elsif @right.left.empty?
      @value = @right.value
      @right = @right.right
    else
      @value = @right.left.value
      @right.left.value = @right.left.right.value
      @right.left.right = @right.left.right.right
      @right.left.left = @right.left.right.left
    end
    self
  end
end

# tree = BinarySearchTree.new(3, BinarySearchTree.new(1), BinarySearchTree.new(5))
# tree.insert(BinarySearchTree.new(10))
# tree.insert(BinarySearchTree.new(7))
# tree.insert(BinarySearchTree.new(12))
# puts "*" * 70
# puts tree.to_string
# tree.remove(3)
# puts "*" * 70
# puts tree.to_string
