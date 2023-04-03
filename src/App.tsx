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

    if (finalGuess.length === CODE_LENGTH) {
      state.addGuess(finalGuess);
      setFinalGuess("");
      return;
    }
    setFinalGuess(finalGuess + newGuess);
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
    <body className="min-h-screen flex items-center justify-center">
      <div className="grid grid-cols-5">
        <header className="p-2 m-2">
          <h1 className="text-4xl text-center text-neutral-50">Mentis</h1>

          <div>
            {/* <input
            type="text"
            className="w-full rounded p-2 border-2 border-gray-500"
            value={finalGuess}
            onChange={onChange}
            disabled={isGameOver}
          /> */}
            <button
              className="block border rounded border-green-500 bg-green-500 p-2 mt-4 mx-auto shadow text-white"
              onClick={() => {
                state.newGame();
                setFinalGuess("");
              }}
            >
              New Game
            </button>
          </div>
        </header>
        <div className="grid col-start-2 col-span-4">
          <WordRow letters={shownAnswer} colors="" guessStates={[]} />
          {rows.reverse().map((word, index) => (
            <WordRow key={index} letters={word} colors="" guessStates={[]} />
          ))}
        </div>
        <div className="grid col-start-6 p-2 h-3/4 m-2">
          <button
            className={`btn border-2 bg-red-500 border-red-500 w-full h-full rounded font-bold text-lg align-middle text-neutral-50`}
            onClick={onChange}
            value="0"
          >
            0
          </button>
          <button
            className={`btn border-2 bg-sky-400 border-sky-400 w-full h-full rounded font-bold text-lg align-middle text-neutral-50`}
            onClick={onChange}
            value="1"
          >
            1
          </button>
          <button
            className={`btn border-2 bg-lime-500 border-lime-500 w-full h-full rounded font-bold text-lg align-middle text-neutral-50`}
            onClick={onChange}
            value="2"
          >
            2
          </button>
          <button
            className={`btn border-2 bg-yellow-400 border-yellow-400 w-full h-full rounded font-bold text-lg align-middle text-neutral-50`}
            onClick={onChange}
            value="3"
          >
            3
          </button>
          <button
            className={`btn border-2 bg-purple-500 border-purple-500 w-full h-full rounded font-bold text-lg align-middle text-neutral-50`}
            onClick={onChange}
            value="4"
          >
            4
          </button>
          <button
            className={`btn border-2 bg-orange-500 border-orange-500 w-full h-full rounded font-bold text-lg align-middle text-neutral-50`}
            onClick={onChange}
            value="5"
          >
            5
          </button>
          <button
            className={`btn border-2 bg-teal-500 border-teal-500 w-full h-full rounded font-bold text-lg align-middle text-neutral-50`}
            onClick={onChange}
            value="6"
          >
            6
          </button>
          <button
            className={`btn border-2 bg-pink-500 border-pink-500 w-full h-full rounded font-bold text-lg align-middle text-neutral-50`}
            onClick={onChange}
            value="7"
          >
            7
          </button>
        </div>
      </div>
    </body>
  );
}
