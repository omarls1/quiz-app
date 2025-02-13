import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./startScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Footer from "./Footer";
import Timer from "./Timer";

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
export default function Quiz({ path }) {
  const [
    { questions, status, current, answer, points, highscore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);

  const maxPossiblePoints = questions.reduce(
    (prev, curr) => prev + curr.points,
    0
  );
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(
          "https://raw.githubusercontent.com/omarls1/quiz-app/refs/heads/main/src/data/db.json"
        );
        const data = (await res.json())[path.slice(1)].slice(1);
        dispatch({ type: "dataReceived", payload: data });
      } catch (err) {
        dispatch({ type: "dataFailed" });
      }
    }
    fetchData();
  }, [path]);

  const handleExit = () => {
    window.history.pushState({}, "", "/");
    const navEvent = new PopStateEvent("popstate");
    window.dispatchEvent(navEvent);
  };

  return (
    <>
      <Header name={path} />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen
            name={path}
            numQuestions={questions.length}
            onStart={dispatch}
          />
        )}
        {status === "active" && (
          <>
            <Progress
              current={current}
              numQuestions={questions.length}
              points={points}
              maxPossiblePoints={maxPossiblePoints}
              answer={answer}
            />
            <Question
              question={questions[current]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
              <NextButton
                dispatch={dispatch}
                answer={answer}
                numQuestions={questions.length}
                current={current}
              />
              <button
                className="btn btn-ui"
                style={{ marginRight: "10px" }}
                onClick={handleExit}
              >
                Exit Quiz
              </button>
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishScreen
            points={points}
            maxPossiblePoints={maxPossiblePoints}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </>
  );
}
