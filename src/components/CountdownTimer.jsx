import { useEffect, useReducer } from "react";

import PropTypes from "prop-types";

const parseDuration = (duration) => {
	const [minutes, seconds] = duration.split("m");
	return parseInt(minutes) * 60 + parseInt(seconds.replace("s", ""));
};

const timerReducer = (state, action) => {
	switch (action.type) {
		case "TICK":
			return { ...state, time: state.time - 1 };
		case "RESET":
			return { time: parseDuration(action.payload), isRunning: false };
		case "START":
			return { ...state, isRunning: true };
		case "PAUSE":
			return { ...state, isRunning: false };
		default:
			throw new Error(`Unknown action type: ${action.type}`);
	}
};

const CountdownTimer = ({ duration, isRunning, resetKey, onTimeUp }) => {
	const initialState = {
		time: parseDuration(duration),
		isRunning: false,
	};

	const [state, dispatch] = useReducer(timerReducer, initialState);

	useEffect(() => {
		dispatch({ type: "RESET", payload: duration });
	}, [duration, resetKey]);

	useEffect(() => {
		let interval = null;
		if (state.isRunning) {
			interval = setInterval(() => {
				dispatch({ type: "TICK" });
			}, 1000);
		} else if (!state.isRunning && state.time !== 0) {
			clearInterval(interval);
		}
		return () => clearInterval(interval);
	}, [state.isRunning, state.time]);

	useEffect(() => {
		if (isRunning) {
			dispatch({ type: "START" });
		} else {
			dispatch({ type: "PAUSE" });
		}
	}, [isRunning]);

	useEffect(() => {
		if (state.time === 0) {
			onTimeUp();
		}
	}, [state.time, onTimeUp]);

	const formatTime = (seconds) => {
		const mins = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${String(mins).padStart(2, "0")}:${String(secs).padStart(
			2,
			"0"
		)}`;
	};

	return (
		<div className="px-4 py-2 text-sm bg-gray-900 rounded-full">
			{formatTime(state.time)}
		</div>
	);
};

CountdownTimer.propTypes = {
	duration: PropTypes.string.isRequired,
	isRunning: PropTypes.bool.isRequired,
	resetKey: PropTypes.number.isRequired,
	onTimeUp: PropTypes.func.isRequired,
};

export default CountdownTimer;
