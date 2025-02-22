import { useEffect } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import { useReducer } from "react";
import Loader from "./components/Loader";
import Error from "./components/Error";
import StartScreen from "./components/StartScreen";
import Questions from "./components/Questions";
import Button from "./components/Button";
import Progress from "./components/Progress";
import FinishScreen from "./components/FinishScreen";
import Footer from "./components/Footer";
import Timer from "./components/Timer";

const SECOND_PER_QUESTION = 30;

const initialState = {
  // status : loding , error , activ , ready , finished ,restart
  status: "loding",

  questions: [],

  //indexing the question mean current question is
  index: 0,
  //asnwer her we set the answer of the user but not he correct one
  answer: null,
  // point for each question correct update
  points: 0,
  //set highr score for each test
  highScore: 0,

  //remind timer the will decress
  remindTimer: null,
};
function reducer(state, action) {
  switch (action.type) {
    case "data-recived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "data-failde":
      return {
        ...state,
        status: "error",
      };
    case "start":
      return {
        ...state,
        status: "active",
        remindTimer: state.questions.length * SECOND_PER_QUESTION,
      };
    case "answer-question": {
      const currentQuestion = state.questions.at(state.index);
      console.log(currentQuestion);
      return {
        ...state,
        answer: action.payload,
        points:
          currentQuestion.correctOption === action.payload
            ? state.points + currentQuestion.points
            : state.points,
      };
    }

    case "next-question":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    case "finish":
      return {
        ...state,
        status: "finished",
        highScore:
          state.highScore < state.points ? state.points : state.highScore,
      };
    case "restart":
      return {
        ...initialState,
        status: "ready",
        questions: state.questions,
      };

    case "tick":
      return {
        ...state,
        remindTimer: state.remindTimer - 1,
        status: state.remindTimer === 0 ? "finished" : state.status,
      };

    default:
      throw Error("No Choice Her");
  }
}

function App() {
  const [
    { status, questions, index, answer, points, highScore, remindTimer },
    dispatch,
  ] = useReducer(reducer, initialState);

  //detrived Variable from state
  const NumberOfQuestion = questions.length;

  //derived variable to calulate the totale Point
  const totalePoints = questions.reduce((prev, curr) => prev + curr.points, 0);

  useEffect(function () {
    fetch("http://localhost:8081/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "data-recived", payload: data }))
      .catch(() => dispatch({ type: "data-failde" }));
  }, []);

  return (
    <div className="app">
      <Header />

      <Main>
        {status === "loding" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen
            NumberOfQuestion={NumberOfQuestion}
            dispatch={dispatch}
          />
        )}

        {status === "active" && (
          <>
            <Progress
              index={index}
              numQuestion={NumberOfQuestion}
              points={points}
              totalPoints={totalePoints}
              answer={answer}
            />

            <Questions
              Question={questions[index]}
              answer={answer}
              dispatch={dispatch}
            />

            {/* button Next show if answer have value */}

            <Footer>
              <Timer dispatch={dispatch} remindTimer={remindTimer} />

              {answer !== null ? (
                index === NumberOfQuestion - 1 ? (
                  <Button
                    title="Finish"
                    handleClick={() => dispatch({ type: "finish" })}
                  />
                ) : (
                  <Button
                    title="Next"
                    handleClick={() => dispatch({ type: "next-question" })}
                  />
                )
              ) : (
                ""
              )}
            </Footer>
          </>
        )}

        {status === "finished" && (
          <FinishScreen
            points={points}
            totalPoints={totalePoints}
            highScore={highScore}
            handleClick={() => dispatch({ type: "restart" })}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
