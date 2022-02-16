import { useEffect, useState, useRef } from 'react';
import './Timer.css';


function Timer() {
  // console.log('render happened')
  const defaultSessionLength = useRef(25);
  const defaultBreakLength = useRef(5);
  const [panelLabel, setPanelLabel] = useState('Session')
  const sessionSeconds = defaultSessionLength.current * 60;
  const breakSeconds = defaultBreakLength.current * 60
  const ticker = useRef(null)
  const [isSessionRound, setSessionRound] = useState(true)
  const [isCountdownActive, setCountdownActivity] = useState(false);
  const [leftSeconds, setLeftSeconds] = useState(sessionSeconds);
  const [value, setValue] = useState(0); //this is for forcing render only

  const ClockStyle = () => {
      let displayMinutes = Math.floor(leftSeconds / 60);
      let displaySeconds = leftSeconds - displayMinutes * 60;
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
  
  const sessionIncrement = () => {
      if (!isCountdownActive) {
        if (sessionSeconds < 3600) {
          defaultSessionLength.current += 1;
          setLeftSeconds(sessionSeconds + 60);
        }
        }
    };
  
    const sessionDecrement = () => {
      if (!isCountdownActive) {
        if (sessionSeconds > 60) {
          defaultSessionLength.current -= 1;
         setLeftSeconds(sessionSeconds - 60);
        }
      }
    };

    const breakIncrement = () => {
        if (!isCountdownActive) {
          if (defaultBreakLength.current < 60) {
            defaultBreakLength.current += 1;
            setValue((justToForceRender) => justToForceRender + 1);
          }
        }
    };

     const breakDecrement = () => {
       if (!isCountdownActive) {
         if (defaultBreakLength.current > 1) {
          defaultBreakLength.current -= 1;
          setValue(justToForceRender => justToForceRender - 1);
         }
       }
     };
    
  const timerToggle = () => {
      if (!isCountdownActive) {
        ticker.current = setInterval(secondDecreaser, 1000);
        setCountdownActivity(!isCountdownActive);
      } else {
        clearInterval(ticker.current);
        ticker.current = null;
        setCountdownActivity(!isCountdownActive);
      }        
        function secondDecreaser() {
          setLeftSeconds(previousSecs => previousSecs - 1)
        }
  }

    useEffect(() => {
      if (leftSeconds === 0) {
        if (isSessionRound) {
          document.getElementById('beep').play()
          setPanelLabel("Break");
          setLeftSeconds(breakSeconds);
          setSessionRound(false);
          
        } else {
          document.getElementById("beep").play();
          setPanelLabel("Session");
          setLeftSeconds(defaultSessionLength.current * 60);
          setSessionRound(true);
        }
        
      }
    }, [leftSeconds, isSessionRound, breakSeconds]
    )
 
  const reset = () => {
    document.getElementById("beep").pause();
    document.getElementById("beep").currentTime = 0;
    setPanelLabel("Session");
    clearInterval(ticker.current);
    ticker.current = null;
    defaultSessionLength.current = 25;
    defaultBreakLength.current = 5;
    setCountdownActivity(false)
    setLeftSeconds(defaultSessionLength.current * 60);
    setSessionRound(true);
    
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
            onClick={() => breakDecrement()}
          >
            <i className="fas fa-chevron-down"></i>
          </div>
          <div
            id="break-length"
            className="bg-light col-2 timer-text d-flex justify-content-center align-items-center lengths"
          >
            {defaultBreakLength.current}
          </div>
          <div
            className="col-2 but d-flex justify-content-center align-items-center"
            id="break-increment"
            onClick={() => breakIncrement()}
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
            onClick={() => sessionDecrement()}
          >
            <i className="fas fa-chevron-down"></i>
          </div>
          <div
            id="session-length"
            className="bg-light col-2 timer-text d-flex justify-content-center align-items-center lengths"
          >
            {defaultSessionLength.current}
          </div>
          <div
            className="col-2 but d-flex justify-content-center align-items-center col-2"
            id="session-increment"
            onClick={() => sessionIncrement()}
          >
            <i className="fas fa-chevron-up"></i>
          </div>
        </div>
        <section
          id="session-timer-panel"
          className="row timer-text mt-3 mb-3 ms-auto me-auto p-3 justify-content-center text-center"
        >
          <div id="timer-label">{panelLabel}</div>
          <ClockStyle />
        </section>
        <div id="navigation" className="row justify-content-center">
          <div
            className="col-2 but d-flex justify-content-center align-items-center col-3 m-1"
            id="start_stop"
            onClick={timerToggle}
          >
            <i className="fas fa-play"></i>
            <i className="fas fa-pause"></i>
          </div>
          <div
            className="col-2 but d-flex justify-content-center align-items-center col-3 m-1"
            id="reset"
            onClick={reset}
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
