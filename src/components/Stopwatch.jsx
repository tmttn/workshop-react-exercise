import React from "react";
import { msToTime, subtractDates } from "../utils/numberHelpers";
import Lap from "./Lap";
import Timer from "./Timer";

const INTERVAL = 10;

function Stopwatch() {
  const laps = [];

  const [timeStarted, setTimeStarted] = React.useState(null);
  const [currentTime, setCurrentTime] = React.useState(new Date());
  const [isRunning, setIsRunning] = React.useState(false);
  const [savedLaps, setSavedLaps] = React.useState(laps);

  const stopwatchRef = React.useRef();

  React.useEffect(() => {
    stopwatchRef.current = setInterval(() => {
      if (isRunning) {
        setCurrentTime(new Date(currentTime.getTime() + INTERVAL));
      }
    }, INTERVAL);

    return () => {
      clearInterval(stopwatchRef.current);
    };
  }, [isRunning, currentTime]);

  return (
    <div className="page-container">
      <div
        data-testid="stopwatch"
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "50%",
        }}
      >
        <div
          style={{ display: "flex", flexDirection: "column", width: "200px" }}
        >
          <Timer timeStarted={timeStarted} currentTime={currentTime} />
          <div className="button-container">
            <button
              className="m-1 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              data-testid="start-button"
              onClick={() => {
                const startDate = new Date();
                if (!timeStarted) {
                  setTimeStarted(startDate);
                  setCurrentTime(startDate);
                }
                setIsRunning(true);
              }}
              style={{ display: isRunning ? "none" : "block" }}
            >
              Start
            </button>
            <button
              className="m-1 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              data-testid="stop-button"
              onClick={() => setIsRunning(false)}
              style={{ display: isRunning ? "block" : "none" }}
            >
              Stop
            </button>
            <button
              className="m-1 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
              data-testid="lap-button"
              onClick={() =>
                setSavedLaps((prevLaps) => [
                  {
                    number: prevLaps.length + 1,
                    value: msToTime(subtractDates(currentTime, timeStarted)),
                  },
                  ...prevLaps,
                ])
              }
            >
              Lap
            </button>
            <button
              className="m-1 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
              onClick={() => {
                setTimeStarted(null);
                setIsRunning(false);
                setSavedLaps([]);
              }}
            >
              Reset
            </button>
          </div>
        </div>
        <div data-testid="laps-container" style={{ height: "200px" }}>
          {savedLaps.map((lap) => {
            return <Lap lap={lap} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default Stopwatch;
