import { useStore } from "./store";
import { computeGuess, LetterState, LETTER_LENGTH } from "./word-utils";


interface WordRowProps {
    letters: string;
}

export default function WordRow({letters: lettersProp = ''}: WordRowProps) {
    const answer = useStore(state => state.answer)
    const lettersRemaining = LETTER_LENGTH - lettersProp.length
    const letters = lettersProp.split('').concat(Array(lettersRemaining).fill(''))
  
    const guessStates = computeGuess(lettersProp, answer)
    return (
    <div className="grid grid-cols-5 gap-2">{letters.map((char, index) => (
        <GuessBox key={index} value={char} state={guessStates[index]}/>
    ))}
    <div className="grid grid-cols-2 gap-2">
    {letters.map((char, index) => (
        <PegBox key={index} value={char} state={guessStates[index]}/>
    ))}
    </div>
    </div>
  )
}



interface CharacterBoxProps {
    value: string;
    state?: LetterState
}
function GuessBox({ value, state }: CharacterBoxProps) {
    const stateStyles = state == null ? '' : pegStateStyles[state]

    return (
        <div className={`inline-block border-2 border-gray-500 p-1 rounded
        before:inline-block before:content-['_']
        uppercase font-bold text-lg text-center`}>
            {value}
        </div>
    )
}

function PegBox({ value, state }: CharacterBoxProps) {
    const stateStyles = state == null ? '' : pegStateStyles[state]

    return (
        <div className={`inline-block border-2 border-gray-500 p-4/3 rounded 
        uppercase font-bold text-lg text-center ${stateStyles}`}>
            ?
        </div>
    )
}

const pegStateStyles = {
    [LetterState.Present]: 'bg-green-500 border-green-500',
    [LetterState.Match]: 'bg-red-500 border-red-500',
    [LetterState.Miss]: 'bg-gray-500 border-gray-500',
}
