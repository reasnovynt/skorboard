import PropTypes from "prop-types";

const AdjustScore = ({
	addScore,
	subtractScore,
	addScoreTwo,
	subtractScoreTwo,
}) => {
	return (
		<div className="fixed z-10 bottom-6">
			<div className="flex items-center max-w-md overflow-auto font-bold divide-x rounded-full divide-slate-700 bg-slate-900">
				<div className="transition duration-150 ease-in-out bg-blue-700 hover:bg-opacity-50">
					<button
						className="w-full py-2 pl-4 pr-3 text-white text-nowrap"
						onClick={addScore}
					>
						+P1
					</button>
				</div>
				<div className="transition duration-150 ease-in-out bg-blue-700 hover:bg-opacity-50">
					<button
						className="w-full px-4 py-2 text-white text-nowrap"
						onClick={subtractScore}
					>
						-P1
					</button>
				</div>
				<div className="w-full px-4 py-2 text-white text-nowrap">
					<span>Adjust Score</span>
				</div>
				<div className="transition duration-150 ease-in-out bg-red-700 hover:bg-opacity-50">
					<button
						className="w-full px-4 py-2 text-white text-nowrap"
						onClick={subtractScoreTwo}
					>
						-P2
					</button>
				</div>
				<div className="transition duration-150 ease-in-out bg-red-700 hover:bg-opacity-50">
					<button
						className="w-full py-2 pl-3 pr-4 text-white text-nowrap"
						onClick={addScoreTwo}
					>
						+P2
					</button>
				</div>
			</div>
		</div>
	);
};

AdjustScore.propTypes = {
	addScore: PropTypes.func.isRequired,
	subtractScore: PropTypes.func.isRequired,
	addScoreTwo: PropTypes.func.isRequired,
	subtractScoreTwo: PropTypes.func.isRequired,
};

export default AdjustScore;
