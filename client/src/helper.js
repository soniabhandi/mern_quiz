export const shuffleAnswers = (questions) => {
  const unshuffledAnswers = [
    questions.correctAnswer,
    ...questions.incorrectAnswers,
  ];

  return unshuffledAnswers
    .map((unshuffledAnswers) => ({
      sort: Math.random(),
      value: unshuffledAnswers,
    }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value);
};
//eg
// unshuffledAnswers.map((unshuffledAnswer) => ({
//   sort: Math.random(), // Random values for explanation
//   value: unshuffledAnswer,
// }));
// Example output with random values:
//   [
//     { sort: 0.42, value: "Paris" },
//     { sort: 0.89, value: "London" },
//     { sort: 0.33, value: "Rome" },
//     { sort: 0.77, value: "Berlin" }
//   ]

// random sorting
//   [
//     { sort: 0.33, value: "Rome" },
//     { sort: 0.42, value: "Paris" },
//     { sort: 0.77, value: "Berlin" },
//     { sort: 0.89, value: "London" }
//   ]

//   // Mapping back to the values:
//   ["Rome", "Paris", "Berlin", "London"]

// export const normalizeQuestions = (backendQuestions) => {
//   return backendQuestions.map((backendQuestion) => {
//     const incorrectAnswers = backendQuestion.incorrect_answers.map(
//       (incorrect_answer) => {
//         decodeURIComponent(incorrect_answer);
//       }
//     );
//     return {
//       correctAnswer: decodeURIComponent(backendQuestion.correct_answer),
//       question: decodeURIComponent(backendQuestion.question),
//       incorrectAnswers,
//     };
//   });
// };

export const normalizeQuestions = (backendQuestions) => {
  if (!Array.isArray(backendQuestions)) {
    throw new TypeError("Expected an array of questions");
  }

  return backendQuestions.map((backendQuestion) => {
    if (!backendQuestion || !Array.isArray(backendQuestion.incorrect_answers)) {
      throw new TypeError(
        "Expected an object with an array of incorrect_answers"
      );
    }

    const incorrectAnswers = backendQuestion.incorrect_answers.map(
      (incorrect_answer) => decodeURIComponent(incorrect_answer)
    );

    return {
      correctAnswer: decodeURIComponent(backendQuestion.correct_answer),
      question: decodeURIComponent(backendQuestion.question),
      incorrectAnswers,
    };
  });
};
