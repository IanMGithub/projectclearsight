export type ActivityChoice = {
  id: string;
  label: string;
};

export type ActivityQuestion = {
  id: string;
  /** Shown when the question is not a simple classification of one statement. */
  instruction?: string;
  prompt: string;
  choices: readonly ActivityChoice[];
  correctId: string;
  explanation: string;
};

export type SubmittedChoice = {
  questionId: string;
  choiceId: string;
  correct: boolean;
};

/** Ignore a second submission for the same question. Invalid choices are ignored. */
export function submitChoice(
  existing: SubmittedChoice | null,
  question: ActivityQuestion,
  choiceId: string,
): SubmittedChoice | null {
  if (existing) return existing;
  if (!question.choices.some((choice) => choice.id === choiceId)) return null;
  return {
    questionId: question.id,
    choiceId,
    correct: choiceId === question.correctId,
  };
}

/** Count each question once, even if a duplicate record is passed in. */
export function scoreAnswers(records: readonly SubmittedChoice[]): { correct: number; answered: number } {
  const seen = new Set<string>();
  let correct = 0;
  let answered = 0;
  for (const record of records) {
    if (seen.has(record.questionId)) continue;
    seen.add(record.questionId);
    answered += 1;
    if (record.correct) correct += 1;
  }
  return { correct, answered };
}
