export const lowerUpperCase = (string) => {
  return `${string.toLowerCase().replace(/(\b\w)(\w*)/g, (match, firstLetter, restOfWord) => firstLetter.toUpperCase() + restOfWord)}`
}