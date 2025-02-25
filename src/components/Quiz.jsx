import { useEffect } from "react";
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
import { useQuiz } from "../contexts/QuizContext";

export default function Quiz({ path }) {
  const {
    status,
   
    dispatch,
  } = useQuiz();


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
  }, [path, dispatch]);

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
        {status === "ready" && <StartScreen name={path} />}
        {status === "active" && (
          <>
            <Progress />
            <Question />
            <Footer>
              <Timer />
              <NextButton />
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
        {status === "finished" && <FinishScreen />}
      </Main>
    </>
  );
}
