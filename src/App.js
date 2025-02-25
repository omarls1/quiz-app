import { useState, useEffect } from "react";
import Quiz from "./components/Quiz";
import Hello from "./components/Hello";
import { QuizProvider } from "./contexts/QuizContext";

function App() {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setPath(window.location.pathname);
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  return (
    <div className="app">
      {path === "/react" || path === "/angular" || path === "/vuejs" ? (
        <QuizProvider>
          <Quiz path={path} />
        </QuizProvider>
      ) : (
        <Hello onSetPath={setPath} />
      )}
      <div className="bg"></div>
      <div className="star-field">
        <div className="layer"></div>
        <div className="layer"></div>
        <div className="layer"></div>
      </div>
    </div>
  );
}

export default App;
