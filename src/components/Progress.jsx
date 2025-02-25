import { useQuiz } from "../contexts/QuizContext";

function Progress() {
  const { current, questions, points, maxPossiblePoints, anwser } =
    useQuiz();
    const numQuestions = questions.length;

  return (
    <header className="progress">
      <progress
        max={numQuestions}
        value={current + Number(anwser !== null)} //convert the boolean value
      ></progress>
      <p>
        Question <strong>{current + 1}</strong> / {numQuestions}
      </p>
      <p>
        <strong> {points} </strong> / {maxPossiblePoints}
      </p>
    </header>
  );
}

export default Progress;
