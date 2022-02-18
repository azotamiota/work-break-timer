import { useEffect, useRef, useReducer } from 'react';
import './Timer.css';


function Timer() {
  console.log("render happened");
  const defaultSessionLength = useRef(25);
  const defaultBreakLength = useRef(5);
  const ticker = useRef(null)
  
  const initialState = {
     sessionLength: defaultSessionLength.current,
     breakLength: defaultBreakLength.current,
     panelLabel: "Session",
     isCountdownActive: false,
     leftSeconds: defaultSessionLength.current * 60
   };

  function reducer(state, action) {
    if (action.type === "SESSION_INCREASE") {
      defaultSessionLength.current += 1;
      return { ...state, 
        sessionLength: defaultSessionLength.current,
        leftSeconds: defaultSessionLength.current * 60 };
    }
  
   if (action.type === "SESSION_DECREASE") {
     defaultSessionLength.current -= 1;
     return {
       ...state,
       sessionLength: defaultSessionLength.current,
       leftSeconds: defaultSessionLength.current * 60,
     };
    }

  if (action.type === "BREAK_INCREASE") {
     defaultBreakLength.current += 1;
     return { ...state, breakLength: defaultBreakLength.current };
    }

  if (action.type === "BREAK_DECREASE") {
    defaultBreakLength.current -= 1;
    return { ...state, breakLength: defaultBreakLength.current };
  }

   if (action.type === "START_PAUSE") {
    if (!state.isCountdownActive) {
      return { ...state, isCountdownActive: true };
    } else {
      return {...state, isCountdownActive: false}
    }
   }

   if (action.type === "TICK") {
     if (state.leftSeconds > 0) {
       return {
         ...state,
         leftSeconds: state.leftSeconds - 1,
      };
     } else if (state.panelLabel === 'Session') {
       return {
         ...state,
         panelLabel: 'Break',
         leftSeconds: defaultBreakLength.current * 60
       };
     }
     if (state.leftSeconds > 0 && state.panelLabel === 'Break') {
       return {
         ...state,
         leftSeconds: state.leftSeconds - 1,
       };
     } else {
       return {
         ...state,
         panelLabel: 'Session',
         leftSeconds: defaultSessionLength.current * 60
       }
     }
   }

    if (action.type === "RESET") {
      defaultBreakLength.current = 5;
      defaultSessionLength.current = 25;
      clearInterval(ticker.current);
        return {
          sessionLength: defaultSessionLength.current,
          breakLength: defaultBreakLength.current,
          panelLabel: "Session",
          isCountdownActive: false,
          leftSeconds: defaultSessionLength.current * 60,
        };
    }
 }
 

  const [state, dispatch] = useReducer(reducer, initialState);
  console.log("full state: ", state);

   useEffect(() => {
     if (state.isCountdownActive) {
       ticker.current = setInterval(() => {
         dispatch({ type: "TICK" });
       }, 100);
     } else {
       clearInterval(ticker.current);
       ticker.current = null;
     }
   }, [state.isCountdownActive]);

  const ClockStyle = () => {
      let displayMinutes = Math.floor(state.leftSeconds / 60);
      let displaySeconds = state.leftSeconds - displayMinutes * 60;
      displayMinutes =
        displayMinutes < 10
          ? (displayMinutes = "0" + displayMinutes)
          : displayMinutes;
      displaySeconds =
        displaySeconds < 10
          ? (displaySeconds = "0" + displaySeconds)
          : displaySeconds;
      return <div id="time-left">{displayMinutes + ":" + displaySeconds}</div>;
      ;
  }

  return (
    <>
      <div className="container mb-5 ms-auto me-auto p-2">
        <div
          id="break-label"
          className="row timer-text justify-content-center p-2"
        >
          Break length
        </div>
        <div className="row justify-content-evenly">
          <div
            className="col-2 but d-flex justify-content-center align-items-center col-2"
            id="break-decrement"
            onClick={() =>
              state.isCountdownActive === false &&
              defaultBreakLength.current > 1 &&
              dispatch({ type: "BREAK_DECREASE" })
            }
          >
            <i className="fas fa-chevron-down"></i>
          </div>
          <div
            id="break-length"
            className="bg-light col-2 timer-text d-flex justify-content-center align-items-center lengths"
          >
            {state.breakLength}
          </div>
          <div
            className="col-2 but d-flex justify-content-center align-items-center"
            id="break-increment"
            onClick={() =>
              state.isCountdownActive === false &&
              defaultBreakLength.current < 60 &&
              dispatch({ type: "BREAK_INCREASE" })
            }
          >
            <i className="fas fa-chevron-up"></i>
          </div>
        </div>
        <div className="row justify-content-evenly mt-4">
          <div
            id="session-label"
            className="row timer-text justify-content-center p-2"
          >
            Session length
          </div>
          <div
            className="col-2 but d-flex justify-content-center align-items-center col-2"
            id="session-decrement"
            onClick={() =>
              state.isCountdownActive === false &&
              defaultSessionLength.current > 1 &&
              dispatch({ type: "SESSION_DECREASE" })
            }
          >
            <i className="fas fa-chevron-down"></i>
          </div>
          <div
            id="session-length"
            className="bg-light col-2 timer-text d-flex justify-content-center align-items-center lengths"
          >
            {state.sessionLength}
          </div>
          <div
            className="col-2 but d-flex justify-content-center align-items-center col-2"
            id="session-increment"
            onClick={() =>
              state.isCountdownActive === false &&
              defaultSessionLength.current < 60 &&
              dispatch({ type: "SESSION_INCREASE" })
            }
          >
            <i className="fas fa-chevron-up"></i>
          </div>
        </div>
        <section
          id="session-timer-panel"
          className="row timer-text mt-3 mb-3 ms-auto me-auto p-3 justify-content-center text-center"
        >
          <div id="timer-label">{state.panelLabel}</div>
          <ClockStyle />
        </section>
        <div id="navigation" className="row justify-content-center">
          <div
            className="col-2 but d-flex justify-content-center align-items-center col-3 m-1"
            id="start_stop"
            onClick={() => dispatch({ type: "START_PAUSE" })}
          >
            <i className="fas fa-play"></i>
            <i className="fas fa-pause"></i>
          </div>
          <div
            className="col-2 but d-flex justify-content-center align-items-center col-3 m-1"
            id="reset"
            onClick={() => dispatch({ type: "RESET" })}
          >
            <i className="fas fa-repeat"></i>
          </div>
        </div>
        <audio
          id="beep"
          src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
        />
      </div>
      <footer id="copyright" className="ms-auto me-auto">
        Designed and Coded By
        <br />
        <a href="https://azotamiota.github.io">azotamiota</a>
      </footer>
    </>
  );
}

export default Timer;
