import { useContext, useEffect } from "react";
import Question from "./Question";
import { QuizContext } from "../contexts/quiz";
import TopicSelection from "./TopicSelection";

const Quiz = () => {
  const [quizState, dispatch] = useContext(QuizContext);

  useEffect(() => {
    if (
      quizState.questions.length > 0 ||
      quizState.error ||
      quizState.showTopicSelection
    ) {
      return;
    }

    const apiURL = `https://opentdb.com/api.php?amount=10&category=${quizState.selectedTopic}&difficulty=easy&type=multiple&encode=url3986`;

    fetch(apiURL)
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: "LOADED_QUESTIONS", payload: data.results });
      })
      .catch((err) => {
        dispatch({ type: "SERVER_ERROR", payload: err.message });
      });
  }, [
    quizState.selectedTopic,
    quizState.questions.length,
    quizState.error,
    quizState.showTopicSelection,
    dispatch,
  ]);

  if (quizState.showTopicSelection) {
    return <TopicSelection />;
  }

  return (
    <div className="quiz">
      {quizState.error && (
        <div className="results">
          <div className="congratulations">Server error</div>
          <div className="results-info">
            <div>{quizState.error}</div>
          </div>
        </div>
      )}
      {quizState.showResults && (
        <div className="results">
          <div className="congratulations">Congratulations</div>
          <div className="results-info">
            <div>You have completed the quiz.</div>
            <div>
              You've got {quizState.correctAnswerCount} of{" "}
              {quizState.questions.length}
            </div>
          </div>
          <div
            className="next-button"
            onClick={() => dispatch({ type: "RESTART" })}
          >
            Restart
          </div>
        </div>
      )}
      {!quizState.showResults && quizState.questions.length > 0 && (
        <div>
          <div className="score">
            Question {quizState.currentQuestionIndex + 1}/
            {quizState.questions.length}
          </div>
          <Question />
          <div
            className="next-button"
            onClick={() => dispatch({ type: "NEXT_QUESTION" })}
          >
            Next question
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;
