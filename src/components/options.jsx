import { useQuiz } from "../contexts/QuizContext";

function Options() {
  const { questions, current, dispatch, answer } = useQuiz();
  const question = questions[current];
  return (
    <div className="options">
      {question.options.map((option, index) => {
        return (
          <button
            onClick={() => dispatch({ type: "newAnswer", payload: index })}
            style={{
              backgroundColor:
                answer !== null &&
                index === answer &&
                index !== question.correctOption
                  ? "red"
                  : "",
              border:
                answer !== null &&
                index === answer &&
                index !== question.correctOption
                  ? "red"
                  : "",
            }}
            className={`btn btn-option ${index === answer ? "answer" : ""} ${
              answer !== null &&
              (index === question.correctOption ? "correct" : "wrong")
            }`}
            key={option}
            disabled={answer !== null}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}

export default Options;
