/**
 * Given a string and a list of words (dictionary), return `true` if the
 * string can be split into words from the dictionary and `false`
 * otherwise.
 *
 * @example
 * isStringBreakable('catsanddogs', ['cat', 'cats', 'sand', 'dogs']); // => true
 * isStringBreakable('sayhiforme', ['say', 'hi', 'form']); // => false
 *
 * @param {string} string - The string to be segmented.
 * @param {string[]} dictionary - Array of words forming the dictionary.
 * @returns {boolean} - True if the string can be segmented, otherwise false.
 */

const { Trie } = require('./Trie.js')

function isStringBreakable(string, dictionary) {
  let trie = new Trie(dictionary);

  return validWordStart(0, string, trie.root, '', trie);
}

function validWordStart(index, string, currentNode, currentString, trie) {  
  if (trie.contains(string)) {
    return true;
  }
  
  let currentLetter = string[index];
  
  if(currentNode.isEndOfWord) {

    let newString = string.slice(index);
    if (validWordStart(0, newString, trie.root, '', trie)) {
      return true;
    } else {
      if(currentNode.hasChild(currentLetter)) {
        index += 1;
        currentNode = currentNode.getChild(currentLetter);
        currentString += currentLetter;
        return validWordStart(index, string, currentNode,currentString, trie);
      } else {
        return false;
      }
    }
  } else {
    if(currentNode.hasChild(currentLetter)) {
      index += 1;
      currentNode = currentNode.getChild(currentLetter);
      currentString += currentLetter;
      return validWordStart(index, string, currentNode, currentString, trie);
    } else {
      return false;
    }
  }
}

if (require.main === module) {
  let dictionary = ['cat', 'cats', 'sand', 'dogs'];
  let other = ['cat', 'cats', 'and', 'dogs'];

  console.log("Should be true: ", isStringBreakable('catsand', dictionary));
  console.log("Should be false: ", isStringBreakable('nope', dictionary));
  console.log("Should be false: ", isStringBreakable('catsan', dictionary));
  console.log("Should be true: ", isStringBreakable('catsand', other));
}

module.exports = {
  isStringBreakable,
}
