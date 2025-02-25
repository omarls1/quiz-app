import { useQuiz } from "../contexts/QuizContext";

function StartScreen({ name }) {
  const { numQuestions, dispatch } = useQuiz();
  const navigateToHome = () => {
    window.history.pushState({}, "", "/");
    const navEvent = new PopStateEvent("popstate");
    window.dispatchEvent(navEvent);
  };

  return (
    <div className="start">
      <h2>Welcome to the {name.slice(1).toUpperCase()} Quiz! 🎉</h2>
      <h3>
        {numQuestions} questions to test your {name.slice(1)} mastery 🧠
      </h3>
      <p>Get ready to challenge yourself and have fun! 🚀</p>
      <p style={{ marginBottom: "25px" }}>Good luck! 🍀</p>
      <div className="button-row">
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "startQuiz" })}
        >
          Let's start! 🎬
        </button>
        <button className="btn btn-ui" onClick={navigateToHome}>
          Homepage 🏠
        </button>
      </div>
    </div>
  );
}

export default StartScreen;
