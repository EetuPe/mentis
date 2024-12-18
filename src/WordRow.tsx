import React, { useState, useEffect } from "react";
import { useStore } from "./store";
import {
  computeGuess,
  computeColor,
  LetterState,
  ColorState,
  CODE_LENGTH,
} from "./word-utils";

interface WordRowProps {
  letters: string;
  colors: string;
  guessStates: [];
}

const guessStateStyles = {
  [ColorState.Zero]: "bg-red-500 border-red-500",
  [ColorState.One]: "bg-sky-400 border-sky-400",
  [ColorState.Two]: "bg-lime-500 border-lime-500",
  [ColorState.Three]: "bg-yellow-400 border-yellow-400",
  [ColorState.Four]: "bg-purple-500 border-purple-500",
  [ColorState.Five]: "bg-orange-500 border-orange-500",
  [ColorState.Six]: "bg-teal-500 border-teal-500",
  [ColorState.Seven]: "bg-pink-500 border-pink-500",
};

const pegStateStyles = {
  [LetterState.Present]: "bg-neutral-50 border-neutral-50",
  [LetterState.Match]: "bg-red-500 border-red-500 text-red-500",
  [LetterState.Miss]: "bg-white-500 border-white-500",
};

export default function WordRow({
  letters: lettersProp = "",
  colors: colorsProp = "",
}: WordRowProps) {
  const answer = useStore((state) => state.answer);
  const lettersRemaining = CODE_LENGTH - lettersProp.length;
  const letters = lettersProp
    .split("")
    .concat(Array(lettersRemaining).fill(""));

  const guessStates = computeGuess(lettersProp, answer);
  const colorStates = computeColor(lettersProp);
  const [guessState, setGuessState] = useState(guessStates);

  useEffect(() => {
    setGuessState(guessStates.sort(() => (Math.random() > 0.5 ? 1 : -1)));
  }, [lettersRemaining]);

  return (
    <div className={`grid grid-cols-${CODE_LENGTH + 1}`}>
      {letters.map((char, index) => (
        <GuessBox
          key={index}
          value={char}
          state={guessStates[index]}
          state2={colorStates[index]}
        />
      ))}
      <div className="grid grid-cols-2">
        {letters.map((char, index) => (
          <PegBox key={index} value={char} state={guessState[index]} />
        ))}
      </div>
    </div>
  );
}

interface GuessBoxProps {
  value: string;
  state2?: ColorState;
  state?: LetterState;
}
interface CharacterBoxProps {
  value: string;
  state?: LetterState;
}
function GuessBox({ value, state2 }: GuessBoxProps) {
  const stateStyles2 = state2 == null ? "" : guessStateStyles[state2];

  return (
    <button
      className={`btn border-2 border-gray-500 w-full h-full rounded font-bold text-lg align-middle text-neutral-50 ${stateStyles2}`}
    >
      {/* {value} */}
    </button>
  );
}

function PegBox({ value, state }: CharacterBoxProps) {
  const stateStyles = state == null ? "" : pegStateStyles[state];

  return (
    <div
      className={`inline-block border-2 border-gray-500 rounded 
        uppercase font-bold text-lg text-center text-neutral-50 ${stateStyles}`}
    >
      ?
    </div>
  );
}
