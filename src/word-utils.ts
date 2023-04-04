export const CODE_LENGTH = 4;

export enum LetterState {
  Miss,
  Present,
  Match,
}

// change color depending on the number (0-9) and store in enum
export enum ColorState {
  Zero,
  One,
  Two,
  Three,
  Four,
  Five,
  Six,
  Seven,
}

export function computeGuess(
  guess: string,
  answerString: string
): LetterState[] {
  const result: LetterState[] = [];
  const result2: ColorState[] = [];

  if (guess.length !== answerString.length) {
    return result;
  }

  const answer = answerString.split("");

  const guessAsArray = guess.split("");

  const answerLetterCount: Record<string, number> = {};

  // alternative approaches to this logic
  // https://github.com/rauchg/wordledge/blob/main/pages/_middleware.ts#L46-L69

  guessAsArray.forEach((letter, index) => {
    const currentAnswerLetter = answer[index];

    answerLetterCount[currentAnswerLetter] = answerLetterCount[
      currentAnswerLetter
    ]
      ? answerLetterCount[currentAnswerLetter] + 1
      : 1;

    if (currentAnswerLetter === letter) {
      result.push(LetterState.Match);
    } else if (answer.includes(letter)) {
      result.push(LetterState.Present);
    } else {
      result.push(LetterState.Miss);
    }

    if (currentAnswerLetter === "0") {
      result2.push(ColorState.Zero);
    } else if (currentAnswerLetter === "1") {
      result2.push(ColorState.One);
    } else if (currentAnswerLetter === "2") {
      result2.push(ColorState.Two);
    } else if (currentAnswerLetter === "3") {
      result2.push(ColorState.Three);
    } else if (currentAnswerLetter === "4") {
      result2.push(ColorState.Four);
    } else if (currentAnswerLetter === "5") {
      result2.push(ColorState.Five);
    } else if (currentAnswerLetter === "6") {
      result2.push(ColorState.Six);
    } else if (currentAnswerLetter === "7") {
      result2.push(ColorState.Seven);
    }
  });

  result.forEach((curResult, resultIndex) => {
    if (curResult !== LetterState.Present) {
      return;
    }

    const guessLetter = guessAsArray[resultIndex];

    answer.forEach((currentAnswerLetter, answerIndex) => {
      if (currentAnswerLetter !== guessLetter) {
        return;
      }

      if (result[answerIndex] === LetterState.Match) {
        result[resultIndex] = LetterState.Miss;
      }

      if (answerLetterCount[guessLetter] <= 0) {
        result[resultIndex] = LetterState.Miss;
      }
    });

    answerLetterCount[guessLetter]--;
  });

  return result;
}

export function computeColor(guess: string): ColorState[] {
  const result2: ColorState[] = [];

  const guessAsArray = guess.split("");

  guessAsArray.forEach((letter, index) => {
    if (guessAsArray[index] === "0") {
      result2.push(ColorState.Zero);
    } else if (guessAsArray[index] === "1") {
      result2.push(ColorState.One);
    } else if (guessAsArray[index] === "2") {
      result2.push(ColorState.Two);
    } else if (guessAsArray[index] === "3") {
      result2.push(ColorState.Three);
    } else if (guessAsArray[index] === "4") {
      result2.push(ColorState.Four);
    } else if (guessAsArray[index] === "5") {
      result2.push(ColorState.Five);
    } else if (guessAsArray[index] === "6") {
      result2.push(ColorState.Six);
    } else if (guessAsArray[index] === "7") {
      result2.push(ColorState.Seven);
    }
  });
  return result2;
}

export function getRandomWord(): string {
  let randomNumber = "";
  for (let i = 0; i < CODE_LENGTH; i++) {
    randomNumber += Math.floor(Math.random() * 8);
  }
  return randomNumber;
}
