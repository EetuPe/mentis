import { useState } from "react";
import { useStore } from "./store";
import { CODE_LENGTH } from "./word-utils";
import WordRow from "./WordRow";

const GUESS_LENGTH = 10;

type onChange = any;

export default function App() {
  const state = useStore();
  const [finalGuess, setFinalGuess] = useState("");

  const onChange: onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newGuess = e.target.value;
    
    if (finalGuess.length === CODE_LENGTH - 1) {
      state.addGuess(finalGuess + newGuess);
      setFinalGuess("");
    } else {
      setFinalGuess(finalGuess + newGuess);
    }
  };

  let rows = [...state.guesses];

  if (rows.length < GUESS_LENGTH) {
    rows.push(finalGuess);
  }

  const numberOfGuessesRemaining = GUESS_LENGTH - rows.length;

  rows = rows.concat(Array(numberOfGuessesRemaining).fill(""));

  const isGameOver = state.guesses.length === GUESS_LENGTH;

  const questionMarks = Array(CODE_LENGTH).fill("?").join("");

  const shownAnswer = isGameOver ? state.answer : questionMarks;

  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-4">
      <h1 className="text-4xl md:text-5xl text-center text-neutral-50 mb-8">Mentis</h1>
      
      <div className="w-full max-w-lg flex gap-4 items-start">
        <div className="flex-1 bg-neutral-800 p-4 rounded-lg shadow-lg">
          <WordRow letters={shownAnswer} colors="" guessStates={[]} />
          <div className="mt-4 space-y-2">
            {rows.reverse().map((word, index) => (
              <WordRow key={index} letters={word} colors="" guessStates={[]} />
            ))}
          </div>
        </div>

        <div className="w-24">
          <button
            className="w-full block border rounded border-green-500 bg-green-500 p-2 mb-4 shadow text-white"
            onClick={() => {
              state.newGame();
              setFinalGuess("");
            }}
          >
            New Game
          </button>
          
          <div className="grid grid-cols-1 gap-2">
            {[0,1,2,3,4,5,6,7].map(num => (
              <button
                key={num}
                className={`btn border-2 w-full aspect-square rounded font-bold text-lg text-neutral-50
                  ${num === 0 ? 'bg-red-500 border-red-500' :
                    num === 1 ? 'bg-sky-400 border-sky-400' :
                    num === 2 ? 'bg-lime-500 border-lime-500' :
                    num === 3 ? 'bg-yellow-400 border-yellow-400' :
                    num === 4 ? 'bg-purple-500 border-purple-500' :
                    num === 5 ? 'bg-orange-500 border-orange-500' :
                    num === 6 ? 'bg-teal-500 border-teal-500' :
                    'bg-pink-500 border-pink-500'}`}
                onClick={onChange}
                value={num}
              >
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
