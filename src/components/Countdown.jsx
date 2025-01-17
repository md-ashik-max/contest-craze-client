
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import "tailwindcss/tailwind.css";

const minuteSeconds = 60;
const hourSeconds = 3600;
const daySeconds = 86400;

const timerProps = {
    isPlaying: true,
    size: 72,
    strokeWidth: 2,
};

const renderTime = (dimension, time) => {
    return (
        <div className="flex flex-col items-center">
            <div className="text-2xl font-bold">{time}</div>
            <div className="text-sm">{dimension}</div>
        </div>
    );
};

const getTimeSeconds = (time) => (minuteSeconds - time) | 0;
const getTimeMinutes = (time) => ((time % hourSeconds) / minuteSeconds) | 0;
const getTimeHours = (time) => ((time % daySeconds) / hourSeconds) | 0;
const getTimeDays = (time) => (time / daySeconds) | 0;

const Countdown = ({deadline}) => {
    const endTime = new Date(deadline).getTime() / 1000;
    const currentTime = Date.now() / 1000;
    const remainingTime = endTime - currentTime;
    const days = Math.ceil(remainingTime / daySeconds);
    const daysDuration = days * daySeconds;

    return (
        <div className="container mx-auto">
        <div className="flex gap-4 items-center py-10">
            <CountdownCircleTimer
                {...timerProps}
                colors="#7E2E84"
                duration={daysDuration}
                initialRemainingTime={remainingTime}
            >
                {({ elapsedTime, color }) => (
                    <span style={{ color }}>
                        {renderTime("days", getTimeDays(daysDuration - elapsedTime))}
                    </span>
                )}
            </CountdownCircleTimer>
            <CountdownCircleTimer
                {...timerProps}
                colors="#D14081"
                duration={daySeconds}
                initialRemainingTime={remainingTime % daySeconds}
                onComplete={(totalElapsedTime) => ({
                    shouldRepeat: remainingTime - totalElapsedTime > hourSeconds,
                })}
            >
                {({ elapsedTime, color }) => (
                    <span style={{ color }}>
                        {renderTime("hours", getTimeHours(daySeconds - elapsedTime))}
                    </span>
                )}
            </CountdownCircleTimer>
            <CountdownCircleTimer
                {...timerProps}
                colors="#EF798A"
                duration={hourSeconds}
                initialRemainingTime={remainingTime % hourSeconds}
                onComplete={(totalElapsedTime) => ({
                    shouldRepeat: remainingTime - totalElapsedTime > minuteSeconds,
                })}
            >
                {({ elapsedTime, color }) => (
                    <span style={{ color }}>
                        {renderTime("minutes", getTimeMinutes(hourSeconds - elapsedTime))}
                    </span>
                )}
            </CountdownCircleTimer>
            <CountdownCircleTimer
                {...timerProps}
                colors="#218380"
                duration={minuteSeconds}
                initialRemainingTime={remainingTime % minuteSeconds}
                onComplete={(totalElapsedTime) => ({
                    shouldRepeat: remainingTime - totalElapsedTime > 0,
                })}
            >
                {({ elapsedTime, color }) => (
                    <span style={{ color }}>
                        {renderTime("seconds", getTimeSeconds(elapsedTime))}
                    </span>
                )}
            </CountdownCircleTimer>
        </div>
    </div>
    );
};
export default Countdown;
