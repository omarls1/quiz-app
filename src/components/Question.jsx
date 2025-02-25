import { useQuiz } from "../contexts/QuizContext";
import Options from "./options";

function Question() {
  const { questions,current } = useQuiz();
  const question = questions[current]
  return (
    <div>
      <h4>{question.question}</h4>
      <Options />
    </div>
  );
}

export default Question;
