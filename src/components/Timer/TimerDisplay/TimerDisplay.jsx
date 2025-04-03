import React, { useEffect, useState, useRef } from 'react'
import './TimerDisplay.css'

const TimerDisplay = ({ time, totalSeconds, isRunning }) => {
    const radius = 140; // Radius of the circle
    const circumference = 2 * Math.PI * radius; // Calculate circumference

    const totalTime = totalSeconds || 1; // Prevent division by zero
    const currentTime = time.hours * 3600 + time.minutes * 60 + time.seconds; // Convert to seconds

    const [progress, setProgress] = useState(circumference);
    const animationRef = useRef(null);
    const lastUpdateRef = useRef(performance.now()); // Keeps track of last frame time

    //const progress = (currentTime / totalTime) * circumference; // Calculate stroke offset

    useEffect(() => {
        if (!isRunning) {
            cancelAnimationFrame(animationRef.current);
            return;
        }

        // Reset lastUpdateRef to avoid time jump when resuming
        lastUpdateRef.current = performance.now();

        const animate = (timestamp) => {
            const elapsedTime = (timestamp - lastUpdateRef.current) / 1000; // Convert to seconds
            lastUpdateRef.current = timestamp;

            const currentSeconds = time.hours * 3600 + time.minutes * 60 + time.seconds;
            const newProgress = (currentSeconds / totalSeconds) * circumference;

            setProgress((prevProgress) =>
                prevProgress - (prevProgress - newProgress) * elapsedTime * 1 // Smooth transition
            );

            animationRef.current = requestAnimationFrame(animate);
        };

        animationRef.current = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animationRef.current);
    }, [isRunning, time, totalSeconds]);

    const formatTime = (value) => value.toString().padStart(2, "0")

    return (
        <div className="time-ring">
            <svg width="300" height="300" viewBox="0 0 300 300">
                <circle
                    cx="150"
                    cy="150"
                    r={radius}
                    //stroke="rgba(0, 122, 255, 0.1)"
                    stroke="#C1C1C1"
                    strokeWidth="10"
                    fill="none"
                />
                {/* Animated Circle (Progress) */}
                <circle
                    cx="150"
                    cy="150"
                    r={radius}
                    stroke="#FF6B6B"
                    strokeWidth="10"
                    fill="none"
                    strokeDasharray={circumference}
                    strokeDashoffset={circumference - progress} // Adjust stroke dynamically
                    strokeLinecap="round"
                    transform="rotate(-90 150 150)" // Rotates the stroke to start from the top
                />
            </svg>
            <div className="timer-display">
                <span className='digits'>
                    {formatTime(time.hours)}:{formatTime(time.minutes)}:{formatTime(time.seconds)}
                </span>
            </div>
        </div>
    )
}

export default TimerDisplay
