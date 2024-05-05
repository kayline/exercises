/**
 * A trie (pronounced "try"), or Prefix Tree, is a tree-like data structure
 * used to store a set of strings in a way that makes it easy to check
 * whether any particular string OR any prefix of any particular string
 * is in the set.
 *
 * See: https://en.wikipedia.org/wiki/Trie
 */

class TrieNode {
  constructor(value, childValues = [], isEndOfWord = false) {
    this.value = value;
    this.isEndOfWord = isEndOfWord;
    this.children = new Map();
    for (let childValue of childValues) {
      this.children.set(childValue, new TrieNode(childValue));
    }

    return this;
  }

  insertChar(char, isEndOfWord = false) {
    let newNode;
    if(!this.hasChild(char)) {
      newNode = new TrieNode(char, [], isEndOfWord);
      this.children.set(char, newNode);
    } else {
      newNode = this.getChild(char);
    }

    return newNode;
  }

  hasChild(char) {
    return this.children.get(char) != undefined;
  }

  getChild(char) {
    return this.children.get(char);
  }

}

class Trie {
  constructor(dictionary) {
    this.root = new TrieNode('');
    for(let word of dictionary) {
      this.insert(word);
    }
  }

  /**
   * Inserts a word into the trie.
   *
   * @param {string} word - The word to be inserted into the trie.
   */
  insert(word) {
    let node = this.root;
    for (let i = 0; i < word.length; i++) {
      let isEndOfWord = (i === (word.length -1));
      node = node.insertChar(word[i], isEndOfWord);
    }

  }

  /**
   * Returns `true` if `word` is in the trie and `false` otherwise.
   *
   * @param {string} word - The word to search for in the trie.
   * @returns {boolean} - True if the word exists in the trie, false otherwise.
   */
  contains(word) {
    let node = this.root;
    for (let char of word) {
      if(!node.hasChild(char)) {
        return false;
      }
      node = node.getChild(char);
    }

    if(node.isEndOfWord) {
      return true;
    } else {
      return false
    }
  }

  /**
   * Returns `true` if any word in the trie has `prefix` as a prefix
   * and `false` otherwise.
   *
   * @param {string} prefix - The prefix to be checked against the words stored in the trie.
   * @returns {boolean}
   */
  containsPrefix(prefix) {
    let node = this.root;
    for (let char of prefix) {
      if(!node.hasChild(char)) {
        return false;
      }
      node = node.getChild(char);
    }

    return true;
  }
}

module.exports = {
  Trie,
}