import { createContext, useContext, useReducer } from "react";

const QuizContext = createContext();
const SECS_PER_QUESTION = 30;

const initialState = {
  questions: [],
  status: "loading", // loading, error , ready, active,finished
  current: 0,
  answer: null,
  timer: null,
  points: 0,
  secondsRemaining: 10,
  highscore: Number(localStorage.getItem("score")),
};
function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };

    case "startQuiz":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };
    case "newAnswer":
      const question = state.questions[state.current];
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return {
        ...state,
        answer: null,
        current: state.current + 1,
      };

    case "finish":
      if (state.points > state.highscore)
        localStorage.setItem("score", state.points);
      return {
        ...state,
        status: "finished",
        highscore: localStorage.getItem("score"),
      };
    case "restart":
      return {
        ...initialState,
        questions: state.questions,
        status: "ready",
        secondsRemaining: null,
      };
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };
    default:
      throw new Error(`Unrecognized action: ${action.type}`);
  }
}
function QuizProvider({ children }) {
  const [
    { questions, status, current, answer, points, highscore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);
  const maxPossiblePoints = questions.reduce(
    (prev, curr) => prev + curr.points,
    0
  );
  return (
    <QuizContext.Provider
      value={{
        questions,
        status,
        current,
        answer,
        points,
        highscore,
        secondsRemaining,
        maxPossiblePoints,
        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined)
    throw new Error("you cannot access the context outside the provider");
  return context;
}
export { QuizProvider, useQuiz };
