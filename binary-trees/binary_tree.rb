# Implement a basic (recursive) Binary Tree
class EmptyTree
  attr_reader :value, :left, :right
  def initialize
    @value = nil
    @left = self
    @right = self
  end

  def empty?
    true
  end

  def height
    0
  end

  def insert(new_value)
    BinarySearchTree.new(new_value)
  end

  def remove(value)
    self
  end

  def rebalance
    self
  end
end

EMPTY_TREE = EmptyTree.new

def BinaryTree(value)
  case value
  when BinaryTree
    value
  else
    BinaryTree.new(value)
  end
end

# For traversal, see
# http://en.wikipedia.org/wiki/Tree_traversal#Implementations

class BinaryTree
  attr_accessor :value, :left, :right

  def initialize(value = nil, left = EMPTY_TREE, right = EMPTY_TREE)
    @value = value
    @left = left
    @right = right
  end

  def max
    if @right.empty?
      @value
    else
      @right.max
    end
  end

  def each(&block)
    if self.empty?
      nil
    else
      block.call(@value, @left, @right)
      unless @left.empty?
        @left.each(&block)
      end
      unless @right.empty?
        @right.each(&block)
      end
    end
  end

  # Implement pre-order traversal of the tree
  def pre_order(&block)
    if self.empty?
      nil
    else
      block.call(@value, @left, @right)
      unless @left.empty?
        @left.pre_order(&block)
      end
      unless right.empty?
        @right.pre_order(&block)
      end
    end
  end

  # Implement in-order traversal of the tree
  def in_order(&block)
    if self.empty?
      nil
    else
      unless @left.empty?
        @left.in_order(&block)
      end
      block.call(@value, @left, @right)
      unless @right.empty?
        @right.in_order(&block)
      end
    end
  end

  # Implement post-order traversal of the tree
  def post_order(&block)
    if self.empty?
      nil
    else
      unless @right.empty?
        @right.post_order(&block)
      end
      unless @left.empty?
        @left.post_order(&block)
      end
      block.call(@value, @left, @right)
    end
  end

  def empty?
    self.class == EmptyTree
  end

  def height
    if self.empty?
      return 0
    end

    1 + [@left.height, @right.height].max
  end

  def is_leaf?
    @left.empty? && @right.empty?
  end

  def to_string(padding = "", pointer = "")
    if self.empty?
      return ""
    end

    result = "#{padding}#{pointer}[#{@value}]\n"
    right_pointer = " └── "
    left_pointer = @right.empty? ? right_pointer : " ├── "

    unless @left.empty?
      result += @left.subtree_to_string(left_pointer, padding, !@right.empty?)
    end
    unless @right.empty?
      result += @right.subtree_to_string(right_pointer, padding, false)
    end

    result
  end

  def subtree_to_string(pointer = "", padding = "", has_right_sibling = false)
    if self.empty?
      return ""
    end

    result = "#{padding}#{pointer}[#{@value}]\n"
    right_pointer = " └── "
    left_pointer = @right.empty? ? right_pointer : " ├── "

    new_padding = has_right_sibling ? " │  " : "    "

    unless @left.empty?
      result += @left.subtree_to_string(left_pointer, padding + new_padding, !@right.empty?)
    end
    unless @right.empty?
      result += @right.subtree_to_string(right_pointer, padding + new_padding, false)
    end

    result
  end
end

# tree = BinaryTree.new(7, BinaryTree.new(5, BinaryTree(3), BinaryTree(6)))
# puts tree.to_string
# puts "The height is #{tree.height}"
# leaf = BinaryTree.new(2)
# puts "The value is #{leaf.value}"
# puts "The left branch is #{leaf.left}"
# puts "The right branch is #{leaf.right}"
# puts leaf.to_string
