import React from 'react'
import './StopWatchDisplay.css'

const StopWatchDisplay = ({ time }) => {

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60000);
        const seconds = Math.floor((time % 60000) / 1000);
        const milliseconds = Math.floor((time % 1000) / 10);
        return {
            minutes: minutes.toString().padStart(2, "0"),
            seconds: seconds.toString().padStart(2, "0"),
            milliseconds: milliseconds.toString().padStart(2, "0")
        };
    };

    const { minutes, seconds, milliseconds } = formatTime(time);

    return (
        <div className='timer'>
            <span className="digits">{minutes}:</span>
            <span className="digits">{seconds}.</span>
            <span className="digits mili-sec">{milliseconds}</span>

        </div>
    )
}

export default StopWatchDisplay
