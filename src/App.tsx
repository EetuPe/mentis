import { useState } from "react";
import { useStore } from "./store";
import { LETTER_LENGTH } from "./word-utils";
import WordRow from "./WordRow";

const GUESS_LENGTH = 10;
export default function App() {
  const state = useStore();
  const [guess, setGuess] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newGuess = e.target.value;

    if (newGuess.length === LETTER_LENGTH) {
      state.addGuess(newGuess);
      setGuess("");
      return;
    }
    setGuess(newGuess);
  };

  let rows = [...state.guesses];

  if (rows.length < GUESS_LENGTH) {
    rows.push(guess);
  }

  const numberOfGuessesRemaining = GUESS_LENGTH - rows.length;

  rows = rows.concat(Array(numberOfGuessesRemaining).fill(""));

  const isGameOver = state.guesses.length === GUESS_LENGTH;

  const shownAnswer = isGameOver ? state.answer : "????";

  return (
    <body className="min-h-screen flex items-center justify-center">
      <header className="p-2 my-2">
        <h1 className="text-4xl text-center text-neutral-50">Mentis</h1>

        <div>
          <input
            type="text"
            className="w-full rounded p-2 border-2 border-gray-500"
            value={guess}
            onChange={onChange}
            disabled={isGameOver}
          />
          <button
            className="block border rounded border-green-500 bg-green-500 p-2 mt-4 mx-auto shadow"
            onClick={() => {
              state.newGame();
              setGuess("");
            }}
          >
            New Game
          </button>
        </div>
      </header>
      <div className="grid grid-cols-1">
        <WordRow letters={shownAnswer} colors="" guessStates={[]} />
        {rows.reverse().map((word, index) => (
          <WordRow key={index} letters={word} colors="" guessStates={[]} />
        ))}
      </div>
    </body>
  );
}
