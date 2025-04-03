import React from 'react'
import './TimerControls.css'


const TimerControls = ({ handleStart, handlePause, handleResume, startBtn, resumeBtn, handleCancel }) => {
    return (
        <div className="btn control-btns">
            <div className='btn-grp'>
                <button className='btn btn-watch btn-two' onClick={handleCancel}>Cancel</button>
                {startBtn ? (
                    <button className='btn btn-watch btn-one' onClick={handleStart}>Start</button>
                ) : resumeBtn ? (
                    <button className='btn btn-watch btn-one' onClick={handleResume}>Resume</button>
                ) : (
                    <button className='btn btn-watch btn-one' onClick={handlePause}>Pause</button>
                )}
            </div>
        </div>
    )
}

export default TimerControls
