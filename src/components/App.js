// import DateCounter from "./DateCounter";
import { useEffect } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Footer from "./Footer";
import Timer from "./Timer";
import { useQuiz } from "../contexts/QuizContext";

// const SEC_PER_Q = 30;

function App() {
  // const initialState = {
  //   questions: [],
  //   // error, loading, finished, active,ready
  //   status: "loading",
  //   index: 0,
  //   answer: null,
  //   points: 0,
  //   highscore: 0,
  //   secondsRemaining: null,
  // };

  // function reducer(state, action) {
  //   switch (action.type) {
  //     case "dataReceived":
  //       return {
  //         ...state,
  //         questions: action.payload,
  //         status: "ready",
  //       };
  //     case "dataFailed":
  //       return {
  //         ...state,
  //         status: "error",
  //       };
  //     case "start":
  //       return {
  //         ...state,
  //         status: "active",
  //         secondsRemaining: state.questions.length * SEC_PER_Q,
  //       };
  //     case "newAnswer":
  //       const question = state.questions.at(state.index);

  //       return {
  //         ...state,
  //         answer: action.payload,
  //         points:
  //           action.payload === question.correctOption
  //             ? state.points + question.points
  //             : state.points,
  //       };
  //     case "nextQuestion":
  //       return {
  //         ...state,
  //         answer: null,
  //         index: state.index + 1,
  //       };
  //     case "finish":
  //       return {
  //         ...state,
  //         status: "finished",
  //         highscore:
  //           state.points > state.highscore ? state.points : state.highscore,
  //       };
  //     case "restart":
  //       return {
  //         ...initialState,
  //         status: "ready",
  //         questions: state.questions,
  //       };
  //     case "tick":
  //       return {
  //         ...state,
  //         secondsRemaining: state.secondsRemaining - 1,
  //         status: state.secondsRemaining === 0 ? "finished" : state.status,
  //       };
  //     // return{
  //     //   ...state,
  //     //   status: "ready",
  //     //   index: 0,
  //     //   answer: null,
  //     //   points: 0,
  //     //   highscore: 0,
  //     // }
  //     default:
  //       throw new Error("Unknown action");
  //   }
  // }

  // const [
  //   { status, questions, index, answer, points, highscore, secondsRemaining },
  //   dispatch,
  // ] = useReducer(reducer, initialState);

  const { dispatch, status } = useQuiz();

  // const numQuestions = questions.length;
  // const maxPossiblePoints = questions.reduce(
  //   (prev, current) => prev + current.points,
  //   0
  // );

  useEffect(() => {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) =>
        dispatch({
          type: "dataReceived",
          payload: data,
        })
      )
      .catch(() =>
        dispatch({
          type: "dataFailed",
        })
      );
  }, [dispatch]);

  return (
    <div className="app">
      {/* <DateCounter /> */}
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          //           <StartScreen numQuestions={numQuestions} dispatch={dispatch} />

          <StartScreen />
        )}
        {status === "active" && (
          <div>
            <Progress
            // maxPossiblePoints={maxPossiblePoints}
            // index={index}
            // points={points}
            // answer={answer}
            // numQuestions={numQuestions}
            />
            <Question
            // question={questions[index]}
            // dispatch={dispatch}
            // answer={answer}
            />
            <Footer>
              <Timer />
              <NextButton
              // dispatch={dispatch}
              // answer={answer}
              // index={index}
              // numQuestions={numQuestions}
              />
            </Footer>
          </div>
        )}
        {status === "finished" && (
          <FinishScreen
          // points={points}
          // maxPossiblePoints={maxPossiblePoints}
          // highscore={highscore}
          // dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
