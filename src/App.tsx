import { useState } from "react";
import { useStore } from "./store";
import { CODE_LENGTH } from "./word-utils";
import WordRow from "./WordRow";

const GUESS_LENGTH = 10;

type onChange = any;

export default function App() {
  const state = useStore();
  const [finalGuess, setFinalGuess] = useState("");

  const onChange: onChange = (e: React.MouseEvent<HTMLButtonElement>) => {
    const newGuess = e.currentTarget.value;

    if (finalGuess.length < CODE_LENGTH - 1) {
      setFinalGuess(finalGuess + newGuess);
    } else if (finalGuess.length === CODE_LENGTH - 1) {
      const completeGuess = finalGuess + newGuess;
      state.addGuess(completeGuess);
      setFinalGuess("");
    }
  };

  let rows = [...state.guesses];

  if (rows.length < GUESS_LENGTH) {
    rows.push(finalGuess);
  }

  const numberOfGuessesRemaining = GUESS_LENGTH - rows.length;

  rows = rows.concat(Array(numberOfGuessesRemaining).fill(""));

  const isGameOver = state.guesses.length >= GUESS_LENGTH;

  const questionMarks = Array(CODE_LENGTH).fill("?").join("");

  const shownAnswer = isGameOver ? state.answer : questionMarks;

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center p-2">
      <h1 className="text-3xl md:text-4xl font-bold text-neutral-50 mb-4 md:mb-6">Mentis</h1>
      
      <div className="w-full max-w-5xl flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-start">
        <div className="w-full sm:w-2/3 bg-slate-800 rounded-lg p-4 md:p-6 shadow-xl">
          <div className="flex justify-between items-center mb-4 md:mb-6">
            <button
              className="px-3 py-1.5 md:px-4 md:py-2 bg-green-500 hover:bg-green-600 rounded-md text-white font-medium transition-colors text-sm md:text-base"
              onClick={() => {
                state.newGame();
                setFinalGuess("");
              }}
            >
              New Game
            </button>
            <div className="bg-slate-700 p-2 md:p-3 rounded-md">
              <WordRow letters={shownAnswer} colors="" guessStates={[]} />
            </div>
          </div>

          <div className="space-y-1.5 md:space-y-2">
            {rows.reverse().map((word, index) => (
              <WordRow 
                key={index} 
                letters={word} 
                colors="" 
                guessStates={[]}
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-3 gap-2 md:gap-3 w-full sm:w-auto">
          {[0, 1, 2, 3, 4, 5, 6, 7].map((num) => {
            const colors = {
              0: "bg-red-500 hover:bg-red-600",
              1: "bg-sky-400 hover:bg-sky-500",
              2: "bg-lime-500 hover:bg-lime-600", 
              3: "bg-yellow-400 hover:bg-yellow-500",
              4: "bg-purple-500 hover:bg-purple-600",
              5: "bg-orange-500 hover:bg-orange-600",
              6: "bg-teal-500 hover:bg-teal-600",
              7: "bg-pink-500 hover:bg-pink-600"
            }[num];

            return (
              <button
                key={num}
                className={`${colors} w-10 h-10 md:w-12 md:h-12 rounded-lg shadow-lg transition-transform hover:scale-105`}
                onClick={onChange}
                value={num}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
