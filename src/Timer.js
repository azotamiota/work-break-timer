import { useEffect, useState, useRef } from 'react';
import './Timer.css';


let ticker;
function Timer() {
  console.log('render happened')
  const defaultSessionLength = useRef(25);
  const defaultBreakLength = useRef(5);
  const [panelLabel, setPanelLabel] = useState('Session')
  const sessionSeconds = defaultSessionLength.current * 60;
  const breakSeconds = defaultBreakLength.current * 60
  const [isSessionRound, setSessionRound] = useState(true)
  const [isCountdownActive, setCountdownActivity] = useState(false);
  const [leftSeconds, setLeftSeconds] = useState(sessionSeconds);
  const [value, setValue] = useState(0);

  let clockStyle = () => {
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
      return displayMinutes + ":" + displaySeconds;
  }
  
  const sessionIncrement = () => {
      if (isCountdownActive === false) {
        if (sessionSeconds < 3600) {
          defaultSessionLength.current += 1;
          console.log('defaultSessionLength: ', defaultSessionLength.current)
          console.log('sessionSeconds should increment here: ', sessionSeconds)
          setLeftSeconds(sessionSeconds + 60);
        }
        }
    };
  
    const sessionDecrement = () => {
      if (isCountdownActive === false) {
        if (sessionSeconds > 60) {
          defaultSessionLength.current -= 1;
          console.log("defaultSessionLength: ", defaultSessionLength.current);
          console.log("sessionSeconds should increment here: ", sessionSeconds);     
          setLeftSeconds(sessionSeconds - 60);
        }
      }
    };

    const breakIncrement = () => {
        if (isCountdownActive === false) {
          if (defaultBreakLength.current < 60) {
            defaultBreakLength.current += 1;
            console.log("defaultBreakLength: ", defaultBreakLength.current);
            setValue((justToForceRender) => justToForceRender + 1);
          }
        }
    };

     const breakDecrement = () => {
       if (isCountdownActive === false) {
         if (defaultBreakLength.current > 1) {
          defaultBreakLength.current -= 1;
          setValue(justToForceRender => justToForceRender - 1);
         }
       }
     };
    
  const timerToggle = () => {
      if (isCountdownActive === false) {
        ticker = setInterval(secondDecreaser, 1000);
        setCountdownActivity(true);
      } else {
        clearInterval(ticker);
        ticker = null;
        setCountdownActivity(false);
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
          console.log('switched to break countdown')
          setLeftSeconds(breakSeconds);
          setSessionRound(false);
          
        } else {
          document.getElementById("beep").play();
          setPanelLabel("Session");
          setLeftSeconds(defaultSessionLength.current * 60);
          setSessionRound(true);
          console.log("switched to session countdown");
        }
        
      }
    }, [leftSeconds]
    )
 
  const reset = () => {
    document.getElementById("beep").pause();
    document.getElementById("beep").currentTime = 0;
    setPanelLabel("Session");
    clearInterval(ticker);
    ticker = null;
    defaultSessionLength.current = 25;
    defaultBreakLength.current = 5;
    setCountdownActivity(false)
    setLeftSeconds(defaultSessionLength.current * 60);
    setSessionRound(true);
   document.getElementById("break-length").innerHTML = 5;
    
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
          <button
            type="button"
            className="btn btn-secondary col-2"
            id="break-decrement"
            onClick={() => breakDecrement()}
          >
            <i className="fas fa-chevron-down"></i>
          </button>
          <div
            id="break-length"
            className="bg-light col-2 timer-text d-flex justify-content-center align-items-center lengths"
          >
            {defaultBreakLength.current}
          </div>
          <button
            type="button"
            className="btn btn-secondary col-2"
            id="break-increment"
            onClick={() => breakIncrement()}
          >
            <i className="fas fa-chevron-up"></i>
          </button>
        </div>
        <div className="row justify-content-evenly mt-4">
          <div
            id="session-label"
            className="row timer-text justify-content-center p-2"
          >
            Session length
          </div>
          <button
            type="button"
            className="btn btn-secondary col-2"
            id="session-decrement"
            onClick={() => sessionDecrement()}
          >
            <i className="fas fa-chevron-down"></i>
          </button>
          <div
            id="session-length"
            className="bg-light col-2 timer-text d-flex justify-content-center align-items-center lengths"
          >
            {defaultSessionLength.current}
          </div>
          <button
            type="button"
            className="btn btn-secondary col-2"
            id="session-increment"
            onClick={() => sessionIncrement()}
          >
            <i className="fas fa-chevron-up"></i>
          </button>
        </div>
        <section
          id="session-timer-panel"
          className="row timer-text mt-3 mb-3 ms-auto me-auto p-3 justify-content-center text-center"
        >
          <div id="timer-label">{panelLabel}</div>
          <div id="time-left">{clockStyle()}</div>
        </section>
        <div id="navigation" className="row justify-content-center">
          <button
            type="button"
            className="btn btn-secondary col-3 m-1"
            id="start_stop"
            onClick={timerToggle}
          >
            <i className="fas fa-play"></i>
            <i className="fas fa-pause"></i>
          </button>
          <button
            type="button"
            className="btn btn-secondary col-3 m-1"
            id="reset"
            onClick={reset}
          >
            <i className="fas fa-repeat"></i>
          </button>
        </div>
        <audio
          id="beep"
          src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
        />
      </div>
      <footer id="copyright" className='ms-auto me-auto'>
        Designed and Coded By
        <br />
        <a href="https://azotamiota.github.io">azotamiota</a>
      </footer>
    </>
  );
}

export default Timer;
