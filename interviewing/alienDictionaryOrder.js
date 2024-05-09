/**
 * You are given a list of lexicographically sorted words from an alien language.
 * The letters in this language language, despite using ASCII characters, has
 * its own alphabetical order.
 *
 * Return the alphabetical order of all the letters found in the list of words.
 * If there's more than one possible answer, return any one of them. If there's
 * no possible order return an empty string.
 *
 * @param {string[]} words - List of words sorted lexicographically according to the alien language's alphabet.
 * @returns {string} - A possible alphabetical order of the alphabet for the alien language.
 */
const {topologicalSort} = require('../graphs/topologicalSort.js');

function alienDictionaryOrder(words) {
  let graph = buildDictionaryGraph(words);

  if (!graph) {
    return '';
  }

  let topoSort = topologicalSort(graph);

  if (topoSort) {
    return topoSort.join('');
  } else {
    return '';
  }
}

function buildDictionaryGraph(words) {
  let lettersArray = words.join('').split('');
  let uniqueLettersSet = new Set(lettersArray);
  let nodes = [...uniqueLettersSet];

  let graph = Object.fromEntries(nodes.map(node => [node, []]));

  for (i = 0; i < words.length - 1; i++) {
    let firstWord = words[i];
    let secondWord = words[i+1];
    if (firstWord.includes(secondWord)) {
      return null;
    }

    let minWordLength = Math.min(firstWord.length, secondWord.length);
    for (j = 0; j < minWordLength; j++) {
      let firstLetter = firstWord[j];
      let secondLetter = secondWord[j];
      if (firstLetter != secondLetter) {
        graph[firstLetter].push(secondLetter);
        break
      }
    }
  }

  return graph;
}

if (require.main === module) {
  console.log(alienDictionaryOrder(["kaa","akcd","akca","cak","cad"]) === "kdac");
  console.log(alienDictionaryOrder(["z", "d"]) === "zd");
  console.log(alienDictionaryOrder(["ab", "a", "b"]) === "");
}

module.exports = {
  alienDictionaryOrder,
}
