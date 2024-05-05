// /**
//  * Given an N-by-N array of characters (representing a Boggle board)
//  * and a list of valid words, return an array of all possible words
//  * that can be formed by a sequence of adjacent squares.
//  *
//  * For a given square, any of the neighboring 8 squares is considered
//  * adjacent.
//  *
//  * @param {string[][]} board - The n-by-n Boggle board
//  * @param {string} dictionary - A list of valid words
//  * @returns {string[]} - List of valid words found on the board
//  */
const { Trie } = require('./Trie.js')

function findWordsOnBoggleBoard(board, dictionary) {
  let rows = board.length;
  let cols = board[0].length;
  let trie = new Trie(dictionary);
  let words = [];

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      dfs(i, j, board, '', trie.root, words)
    }
  }

  return words; 
}

function dfs(row, col, board, currentString, currentNode, words) {
  let rows = board.length;
  let cols = board[0].length;

  if (row < 0 || col < 0 || row >= rows || col >= cols) {
      return;
  }

  let character = board[row][col];

  if (character === '#') {
    return;
  }

  currentNode = currentNode.children.get(character);
  currentString += board[row][col];

  if (!currentNode) {
    return;
  }

  if (currentNode.isEndOfWord) {
    words.push(currentString);
  }
  
  board[row][col] = '#';

  dfs(row + 1, col, board, currentString, currentNode, words);
  dfs(row - 1, col, board, currentString, currentNode, words);
  dfs(row, col + 1, board, currentString, currentNode, words);
  dfs(row, col - 1, board, currentString, currentNode, words);

  board[row][col] = character;
}

if (require.main === module) {
  let board = [
    ['c', 'a', 't'],
    ['o', 'l', 'b'],
    ['w', 'l', 'e'],
  ];
  let dictionary = ['cat', 'cow', 'all'];
  let foundWords = findWordsOnBoggleBoard(board, dictionary);
  console.log(foundWords);
}

module.exports = {
  findWordsOnBoggleBoard,
}
