import React from 'react'
import './StopWatchControls.css'

const StopWatchControls = ({ handleStart, handlePauseResume, handleReset, active }) => {

    const startButton = (
        <button className="btn btn-watch btn-one btn-start"
            onClick={handleStart}>
            Start
        </button>
    )

    const activeButtons = (
        <div className="btn-grp">
            <button className="btn btn-watch btn-two" onClick={handleReset}>
                Reset
            </button>
            <button className="btn btn-watch btn-one"
                onClick={handlePauseResume}>
                Pause
            </button>
        </div>
    )
    return (
        <div className='btn control-btns'>
            {active
                ? activeButtons
                : startButton}
        </div>
    )
}

export default StopWatchControls
