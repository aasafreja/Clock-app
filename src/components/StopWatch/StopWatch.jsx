import React, { useState, useEffect } from 'react'
import StopWatchDisplay from './StopWatchDisplay/StopWatchDisplay'
import StopWatchControls from './StopWatchControls/StopWatchControls'
import './StopWatch.css'


const StopWatch = () => {

    const [isActive, setIsActive] = useState(false);
    const [isPaused, setIsPaused] = useState(true);
    const [time, setTime] = useState(0);

    //const [activeTab, setActiveTab] = useState('stopwatch'); // 'timer' or 'stopwatch'

    useEffect(() => {
        console.log(`IsActive: ${isActive} and IsPaused: ${isPaused}`);
    }, [isActive, isPaused]); // Runs after state updates

    useEffect(() => {
        let interval = null
        //active=true, ispaused = false
        if (isActive && !isPaused) {

            interval = setInterval(() => {
                setTime(prevTime => prevTime + 10);
            }, 10);
        } else {
            clearInterval(interval);
        }
        return () => clearInterval(interval); // Cleanup when component unmounts
    }, [isActive, isPaused]);

    function handleStart() {
        setIsActive(true)
        setIsPaused(false)
    }

    const handlePauseResume = () => {
        setIsPaused(!isPaused);
    };

    const handleReset = () => {
        setIsActive(false);
        setTime(0);
    };

    return (
        <div className="stop-watch container">
            <h1>Stop-watch</h1>
            <StopWatchDisplay time={time} />
            <StopWatchControls
                handleStart={handleStart}
                handlePauseResume={handlePauseResume}
                handleReset={handleReset}
                active={isActive} />

        </div>
    )
}

export default StopWatch
