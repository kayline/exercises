# Implement a basic (recursive) Binary Tree
EMPTY_TREE = nil

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

  def each(&block)
    if self.empty?
      nil
    else
      block.call(@value, @left, @right)
      unless @left.nil?
        @left.each(&block)
      end
      unless @right.nil?
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
      unless @left.nil?
        @left.pre_order(&block)
      end
      unless right.nil?
        @right.pre_order(&block)
      end
    end
  end

  # Implement in-order traversal of the tree
  def in_order(&block)
    if self.empty?
      nil
    else
      unless @left.nil?
        @left.in_order(&block)
      end
      block.call(@value, @left, @right)
      unless @right.nil?
        @right.in_order(&block)
      end
    end
  end

  # Implement post-order traversal of the tree
  def post_order(&block)
    if self.empty?
      nil
    else
      unless @right.nil?
        @right.post_order(&block)
      end
      unless @left.nil?
        @left.post_order(&block)
      end
      block.call(@value, @left, @right)
    end
  end

  def empty?
    self == EMPTY_TREE
  end

  def to_string(padding = "", pointer = "")
    if self.nil?
      return ""
    end

    result = "#{padding}#{pointer}#{@value}\n"
    right_pointer = " └── "
    left_pointer = @right.nil? ? right_pointer : " ├── "

    unless @left.nil?
      result += @left.subtree_to_string(left_pointer, padding, !@right.nil?)
    end
    unless @right.nil?
      result += @right.subtree_to_string(right_pointer, padding, false)
    end

    result
  end

  def subtree_to_string(pointer = "", padding = "", has_right_sibling = false)
    if self.nil?
      return ""
    end

    result = "#{padding}#{pointer}#{@value}\n"
    right_pointer = " └── "
    left_pointer = @right.nil? ? right_pointer : " ├── "

    new_padding = has_right_sibling ? " │  " : "    "

    unless @left.nil?
      result += @left.subtree_to_string(left_pointer, padding + new_padding, !@right.nil?)
    end
    unless @right.nil?
      result += @right.subtree_to_string(right_pointer, padding + new_padding, false)
    end

    result
  end
end
