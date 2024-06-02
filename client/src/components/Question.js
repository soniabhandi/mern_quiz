import React, { useContext } from "react";
import { QuizContext } from "../contexts/quiz";
import { Answers } from "./Answers";

const Question = () => {
  const [quizState, dispatch] = useContext(QuizContext);

  // Check if there are no questions or currentQuestionIndex is out of bounds
  if (
    !quizState.questions ||
    quizState.questions.length === 0 ||
    quizState.currentQuestionIndex < 0 ||
    quizState.currentQuestionIndex >= quizState.questions.length
  ) {
    return <div>No questions available</div>;
  }

  const currentQuestion = quizState.questions[quizState.currentQuestionIndex];

  // Check if currentQuestion is defined
  if (!currentQuestion) {
    return <div>Current question not found</div>;
  }

  // Check if correctAnswer is defined
  if (typeof currentQuestion.correctAnswer === "undefined") {
    return <div>Correct answer not found</div>;
  }

  return (
    <>
      <div className="question">{currentQuestion.question}</div>
      <div className="answers">
        {quizState.answers.map((answer, index) => (
          <Answers
            answerText={answer}
            key={index}
            index={index}
            currentAnswer={quizState.currentAnswer}
            correctAnswer={currentQuestion.correctAnswer}
            onSelectAnswer={(answerText) => {
              dispatch({ type: "SELECT_ANSWER", payload: answerText });
            }}
          />
        ))}
      </div>
    </>
  );
};

export default Question;
