import PropTypes from "prop-types";

const GameControl = ({ start, pause, reset, isRunning }) => {
	return (
		<div className="flex my-4 space-x-4">
			{!isRunning ? (
				<button
					className="px-4 py-2 text-white rounded bg-violet-600"
					onClick={start}
				>
					Start
				</button>
			) : (
				<button
					className="px-4 py-2 text-white bg-blue-600 rounded"
					onClick={pause}
				>
					Pause
				</button>
			)}
			<button
				className="px-4 py-2 bg-yellow-400 rounded text-slate-950"
				onClick={reset}
			>
				Reset
			</button>
		</div>
	);
};

GameControl.propTypes = {
	start: PropTypes.func.isRequired,
	pause: PropTypes.func.isRequired,
	reset: PropTypes.func.isRequired,
	isRunning: PropTypes.bool.isRequired,
};

export default GameControl;
