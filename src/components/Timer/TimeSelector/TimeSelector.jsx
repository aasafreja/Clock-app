import React from 'react'
import './TimeSelector.css'


const TimeSelector = ({ time, setTime }) => {

    function handleTimeChange(e) {
        const { name, value } = e.target;
        setTime((prev) => ({ ...prev, [name]: Math.max(0, Number(value)) }));
    }

    const generateOptions = (limit) =>
        [...Array(limit).keys()].map((num) => (
            <option key={num} value={num}>
                {num.toString().padStart(2, "0")}
            </option>
        ));


    return (
        <div className="time-selector">

            <div className="picker">
                <select name="hours" value={time.hours} onChange={handleTimeChange}>
                    {generateOptions(24)}
                </select>
                <span>hours</span>
            </div>

            <div className="picker">
                <select name="minutes" value={time.minutes} onChange={handleTimeChange}>
                    {generateOptions(60)}
                </select>
                <span>min</span>
            </div>

            <div className="picker">
                <select name="seconds" value={time.seconds} onChange={handleTimeChange}>
                    {generateOptions(60)}
                </select>
                <span>sec</span>
            </div>

        </div>
    )
}

export default TimeSelector
