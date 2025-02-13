function Hello({ onSetPath }) {
  const navigateToQuiz = (path) => {
    onSetPath(path);
    window.history.pushState({}, "", path);
    const navEvent = new PopStateEvent("popstate");
    window.dispatchEvent(navEvent);
  };

  return (
    <div className="hello">
      <h1><span>Welcome to the Quiz App!</span> <span>🎉</span></h1>
      <p>Choose a quiz to test your knowledge and have fun! 🚀</p>
      <div className="quiz-boxes">
        <div className="quiz-box vue" onClick={() => navigateToQuiz("/vuejs")}>
          <img src="/vuejs.png" alt="Vue.js" />
          <h2>Vue.js Quiz</h2>
          <p>Test your Vue.js skills! 🟢</p>
        </div>
        <div
          className="quiz-box react"
          onClick={() => navigateToQuiz("/react")}
        >
          <img src="/react.png" alt="React" />
          <h2>React Quiz</h2>
          <p>Test your React skills! 🔵</p>
        </div>
        <div
          className="quiz-box angular"
          onClick={() => navigateToQuiz("/angular")}
        >
          <img src="/angular.png" alt="Angular" />
          <h2>Angular Quiz</h2>
          <p>Test your Angular skills! 🔴</p>
        </div>
      </div>
      <p>
        Each quiz is designed to challenge your understanding of the respective
        framework. 💡
      </p>
      <p>Good luck and enjoy the learning journey! 📚</p>
    </div>
  );
}

export default Hello;
