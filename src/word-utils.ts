import wordBank from './word-bank.json'

export function getRandomWord() {
    return wordBank.valid[Math.floor(Math.random() * wordBank.valid.length)]
}