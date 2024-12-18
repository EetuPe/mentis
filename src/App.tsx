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

    if (finalGuess.length < CODE_LENGTH) {
      setFinalGuess(finalGuess + newGuess);
    } else {
      state.addGuess(finalGuess);
      setFinalGuess(newGuess);
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
    <div className="min-h-screen bg-slate-900 flex flex-col items-center p-4">
      <h1 className="text-5xl font-bold text-neutral-50 mb-8">Mentis</h1>
      
      <div className="w-full max-w-3xl flex flex-col md:flex-row gap-8 justify-center items-center">
        <div className="w-full md:w-2/3 bg-slate-800 rounded-lg p-6 shadow-xl min-h-[600px]">
          <div className="flex justify-between items-center mb-6">
            <button
              className="px-4 py-2 bg-green-500 hover:bg-green-600 rounded-md text-white font-medium transition-colors"
              onClick={() => {
                state.newGame();
                setFinalGuess("");
              }}
            >
              New Game
            </button>
            <div className="bg-slate-700 p-3 rounded-md">
              <WordRow letters={shownAnswer} colors="" guessStates={[]} />
            </div>
          </div>

          <div className="space-y-2">
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

        <div className="grid grid-cols-2 md:grid-cols-1 gap-3 w-full md:w-auto">
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
                className={`${colors} w-16 h-16 rounded-lg shadow-lg transition-transform hover:scale-105`}
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
