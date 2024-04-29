/**
 * Given an array of strings, write a function to check if the strings can be chained
 * to form a circle. A string X can be chained together with another string Y if the
 * last character of X is the same as the first character of Y.
 *
 * For example, ["bear", "radish"] can be chained because the last letter of "bear" is
 * 'r' and the first letter of "radish" is also 'r'. This function should return true
 * if all the strings in the array can be chained in such a way that they form a circle.
 */

const { topologicalSort } = require('./topological_sort');

function stringsCanFormCircle(strings) {
  let letters = Array.from('abcdefghijklmnopqrstuvwyyz');
  let graph = Object.fromEntries(letters.map(l => [l, new Set()]));
  for (let word of strings) {
    graph[word[0]].add(word.slice(-1));
  }

  let sorted = topologicalSort(graph);
  return sorted === null;
}

let works = ['abc', 'cde', 'efa'];
let nope = ['fhfd', 'gfdhjd', 'nbvmcxbnz'];

console.log(stringsCanFormCircle(works));
console.log(stringsCanFormCircle(nope));

module.exports = {
  stringsCanFormCircle,
}
