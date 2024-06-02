import { createContext, useReducer } from "react";
import { normalizeQuestions, shuffleAnswers } from "../helper";

const initialState = {
  currentQuestionIndex: 0,
  questions: [],
  showResults: false,
  answers: [],
  currentAnswer: "",
  correctAnswerCount: 0,
  error: null,
  selectedTopic: null,
  showTopicSelection: true,
  isAuthenticated: false, // Add isAuthenticated to initial state
};

const reducer = (state, actions) => {
  switch (actions.type) {
    case "SELECT_ANSWER": {
      const correctAnswerCount =
        actions.payload ===
        state.questions[state.currentQuestionIndex].correctAnswer
          ? state.correctAnswerCount + 1
          : state.correctAnswerCount;
      return {
        ...state,
        currentAnswer: actions.payload,
        correctAnswerCount,
      };
    }
    case "LOADED_QUESTIONS": {
      const normalizedQuestions = normalizeQuestions(actions.payload);
      return {
        ...state,
        questions: normalizedQuestions,
        answers: shuffleAnswers(normalizedQuestions[0]),
      };
    }
    case "NEXT_QUESTION": {
      const showResults =
        state.currentQuestionIndex === state.questions.length - 1;
      const currentQuestionIndex = showResults
        ? state.currentQuestionIndex
        : state.currentQuestionIndex + 1;
      const answers = showResults
        ? []
        : shuffleAnswers(state.questions[currentQuestionIndex]);
      return {
        ...state,
        currentQuestionIndex,
        showResults,
        answers,
        currentAnswer: "",
      };
    }
    case "RESTART": {
      return initialState;
    }
    case "SERVER_ERROR": {
      return {
        ...state,
        error: actions.payload,
      };
    }
    case "SET_TOPIC": {
      return {
        ...state,
        selectedTopic: actions.payload,
      };
    }
    case "START_QUIZ": {
      return {
        ...state,
        showTopicSelection: false,
      };
    }
    case "LOGIN": {
      return {
        ...state,
        isAuthenticated: true,
      };
    }
    case "LOGOUT": {
      return {
        ...state,
        isAuthenticated: false,
      };
    }
    default: {
      return state;
    }
  }
};

export const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const value = useReducer(reducer, initialState);
  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
};
