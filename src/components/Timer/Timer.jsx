import React, { useEffect, useState } from 'react'
import TimeSelector from './TimeSelector/TimeSelector'
import TimerControls from './TimerControls/TimerControls'
import TimerDisplay from './TimerDisplay/TimerDisplay'
import './Timer.css'



const Timer = () => {

    const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0 })
    const [isRunning, setIsRunning] = useState(false);

    const [isActive, setIsActive] = useState(false)

    const [startBtn, setStartBtn] = useState(true)
    const [resumeBtn, setResumeBtn] = useState(false)

    const [initialTotalSeconds, setInitialTotalSeconds] = useState(0); // ✅ Store initial total seconds


    const alarmSound = new Audio('/alarm.mp3'); // Replace with your actual file path

    //const [activeTab, setActiveTab] = useState('stopwatch'); // 'timer' or 'stopwatch'

    useEffect(() => {
        let interval;
        //If isRunning is false, the function exits early (return), meaning the countdown will not start.
        if (!isRunning) return;
        interval = setInterval(() => {
            setTime((prev) => {
                let { hours, minutes, seconds } = prev;

                if (hours === 0 && minutes === 0 && seconds === 0) {
                    clearInterval(interval);
                    setIsRunning(false);
                    console.log('Timer reached 0, playing alarm...');
                    alarmSound.play();

                    setResumeBtn(false)
                    setStartBtn(true)
                    setIsActive(false)

                    return prev;

                }

                if (seconds > 0) { seconds--; } // Step 5
                else if (minutes > 0) {
                    minutes--;
                    seconds = 59;
                } else if (hours > 0) {
                    hours--;
                    minutes = 59;
                    seconds = 59;
                }

                //The function returns the updated { hours, minutes, seconds } object.
                return { hours, minutes, seconds };
            })
            return () => clearInterval(interval); // Cleanup on unmount
        }, 1000);

        //ensures that: No multiple intervals are running simultaneously.
        return () => clearInterval(interval);
    }, [isRunning])

    function handleStart() {
        setIsActive(true)
        setIsRunning(true)
        setStartBtn(false)
        setInitialTotalSeconds(time.hours * 3600 + time.minutes * 60 + time.seconds); // ✅ Save initial total time

    }

    function handlePause() {
        setIsRunning(false)
        setResumeBtn(true)
    }

    function handleResume() {
        setIsRunning(true)
        setResumeBtn(false)
    }

    function handleCancel() {
        setIsRunning(false);
        setTime({ hours: 0, minutes: 0, seconds: 0 });
        setIsActive(false);
        setStartBtn(true);
        setResumeBtn(false);
    }

    const getTotalSeconds = (time) => {
        return time.hours * 3600 + time.minutes * 60 + time.seconds;
    };

    return (
        <div className='timer-app container'>
            <h1>Timer</h1>
            {!isActive ? <TimeSelector time={time} setTime={setTime} />
                : <TimerDisplay
                    time={time}
                    totalSeconds={initialTotalSeconds}
                    isRunning={isRunning} />}



            <TimerControls handleStart={handleStart}
                handlePause={handlePause}
                handleResume={handleResume}
                handleCancel={handleCancel}
                startBtn={startBtn}
                resumeBtn={resumeBtn} />

        </div>
    )
}

export default Timer


