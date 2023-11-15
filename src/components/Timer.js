import { useEffect } from "react";

function Timer({ secondsRemaining, dispatch }) {
  const mins = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;

  useEffect(() => {
    const id = setInterval(function () {
      dispatch({ type: "tick" });
    }, 1000);

    return () => clearInterval(id);
  }, [dispatch]);

  return (
    <div className="timer">
      <p>
        {mins < 10 && "0"}
        {mins}:{seconds < 10 && "0"}
        {seconds}
      </p>
    </div>
  );
}

export default Timer;
