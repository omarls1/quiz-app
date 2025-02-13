function NextButton({ dispatch, answer, current, numQuestions }) {
    if (answer === null) return null;
  
    if (current < numQuestions - 1)
      return (
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "nextQuestion" })}
        >
          Next
        </button>
      );
  
    if (current === numQuestions - 1)
      return (
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "finish" })}
        >
          Finish
        </button>
      );
  }
  
  export default NextButton;