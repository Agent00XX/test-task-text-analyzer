export const countWords = (text) => {
  let arrOfWords = text.split(' ')

  const filteringSpaces = arrOfWords.filter((word) => word !== '').length

  return filteringSpaces
}

export const differentWords = (text) => {
  const words = text.toLowerCase().split(/\W+/);
  const commonWords = ["a", "an", "the", "and", "or", "but", "is", "are", "was", "were", "on", "in", "at", "to", "for", "with", "from", "by"];
  const uniqueWords = words.filter(word => !commonWords.includes(word));

  return uniqueWords;
}

export const wordCountExcludingCommonWords = (text) => {
  const commonWords = ['the', 'and', 'or', 'is', 'are', 'a', 'an', 'in', 'on', 'of'];
  const cleanedText = text.replace(/[^\w\s]/g, '').toLowerCase();
  const words = cleanedText.split(' ');
  const uniqueWords = new Set();
  words.forEach((word) => {
    if (!commonWords.includes(word) && !uniqueWords.has(word)) {
      uniqueWords.add(word);
    }
  });
  return uniqueWords.size;
}

const text = 'The quick brown fox jumps over the lazy dog.';
const result = wordCountExcludingCommonWords(text);
console.log(result);


export const countSentences = (text) => {
  let regex = /[.?!|\r?\n|\r]+/
  const result = text.split(regex)

  if (result.length === 1) {
    return result.length
  }

  return result.length - 1
}

export const countParagraph = (text) => {
  return text.replace(/\n$/gm, '').split(/\n/).length
}

export const findLongestWord = (text) => {
  let longestWord = ''
  const splitText = text.split(/[' '|\r?\n|\r]/)

  for (const word of splitText) {
    // removing  (.?!,)
    const regex = /[.?!,]/
    const replacedWord = word.replace(regex, '')

    if (replacedWord.length > longestWord.length) {
      longestWord = replacedWord
    }
  }

  return longestWord
}

export const calculateReadingTime = (text) => {
  const wpm = 50 // words per minute
  const words = text.trim().split(/\s+/).length
  const time = Math.ceil(words / wpm)

  return `~${time}  ${time > 1 ? 'minutes' : 'minute'}`
}
