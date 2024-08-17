import AdjustScore from "./AdjustScore";
import CountdownTimer from "./CountdownTimer";
import GameControl from "./GameControl";
import { useState } from "react";

// Constants for initial settings
const initialGameDuration = { minutes: 45, seconds: 0 };
const initialPlayerOne = {
	name: "Tiger Club",
	score: 0,
};
const initialPlayerTwo = {
	name: "Dino Dash",
	score: 0,
};

// Function to validate duration
const validateDuration = (minutes, seconds) => {
	const timeInSeconds = minutes * 60 + seconds;
	return timeInSeconds >= 10;
};

// Function to validate player names
const validatePlayerNames = (nameOne, nameTwo) => {
	return nameOne.trim() !== "" && nameTwo.trim() !== "";
};

export default function Scoreboard() {
	const [playerOne, setPlayerOne] = useState(initialPlayerOne);
	const [playerTwo, setPlayerTwo] = useState(initialPlayerTwo);
	const [isRunning, setIsRunning] = useState(false);
	const [resetKey, setResetKey] = useState(0);
	const [gameOver, setGameOver] = useState(false);
	const [winner, setWinner] = useState(null);
	const [minutes, setMinutes] = useState(initialGameDuration.minutes);
	const [seconds, setSeconds] = useState(initialGameDuration.seconds);
	const [showGameSettingsModal, setShowGameSettingsModal] = useState(false);
	const [error, setError] = useState("");

	const [newPlayerOneName, setNewPlayerOneName] = useState(
		initialPlayerOne.name
	);
	const [newPlayerTwoName, setNewPlayerTwoName] = useState(
		initialPlayerTwo.name
	);

	const addScore = (player, setPlayer) => {
		setPlayer((prevPlayer) => ({
			...prevPlayer,
			score: prevPlayer.score + 1,
		}));
	};

	const subtractScore = (player, setPlayer) => {
		setPlayer((prevPlayer) => ({
			...prevPlayer,
			score: prevPlayer.score > 0 ? prevPlayer.score - 1 : 0,
		}));
	};

	const startTimer = () => {
		setIsRunning(true);
		setGameOver(false);
		setWinner(null);
	};

	const pauseTimer = () => setIsRunning(false);

	const resetGame = () => {
		setPlayerOne({ ...playerOne, name: newPlayerOneName });
		setPlayerTwo({ ...playerTwo, name: newPlayerTwoName });
		setIsRunning(false);
		setResetKey((prevKey) => prevKey + 1);
		setGameOver(false);
		setWinner(null);
	};

	const handleTimeUp = () => {
		setIsRunning(false);
		setGameOver(true);
		if (playerOne.score > playerTwo.score) {
			setWinner(playerOne.name);
		} else if (playerTwo.score > playerOne.score) {
			setWinner(playerTwo.name);
		} else {
			setWinner("It's a tie!");
		}
	};

	const handleMinutesChange = (e) => {
		setMinutes(e.target.value);
	};

	const handleSecondsChange = (e) => {
		setSeconds(e.target.value);
	};

	const handlePlayerOneNameChange = (e) => {
		setNewPlayerOneName(e.target.value);
	};

	const handlePlayerTwoNameChange = (e) => {
		setNewPlayerTwoName(e.target.value);
	};

	const saveGameSettings = () => {
		const min = parseInt(minutes, 10);
		const sec = parseInt(seconds, 10);
		if (
			validateDuration(min, sec) &&
			validatePlayerNames(newPlayerOneName, newPlayerTwoName)
		) {
			setPlayerOne({ ...playerOne, name: newPlayerOneName });
			setPlayerTwo({ ...playerTwo, name: newPlayerTwoName });
			setShowGameSettingsModal(false);
			setResetKey((prevKey) => prevKey + 1);
			setError("");
		} else if (!validateDuration(min, sec)) {
			setError("Please enter a valid duration with at least 10 seconds.");
		} else if (!validatePlayerNames(newPlayerOneName, newPlayerTwoName)) {
			setError("Player names cannot be empty.");
		}
	};

	return (
		<div className="container relative flex flex-col items-center justify-center h-full p-8 mx-auto font-bold grow">
			{/* Game Settings Modal */}
			{showGameSettingsModal && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-20 bg-slate-900 backdrop-blur-lg">
					<div className="flex flex-col items-center justify-center max-w-sm p-6 text-center rounded-lg shadow-lg bg-slate-100/30 backdrop-blur-lg text-slate-950">
						<h3 className="mb-4 text-lg font-bold text-slate-100">
							Set Game Duration and Players
						</h3>
						<div className="flex mb-4 space-x-4">
							<input
								type="number"
								value={minutes}
								onChange={handleMinutesChange}
								className="w-24 p-2 border rounded-md bg-opacity-30"
								placeholder="Minutes"
								min="0"
							/>
							<input
								type="number"
								value={seconds}
								onChange={handleSecondsChange}
								className="w-24 p-2 border rounded-md bg-opacity-30"
								placeholder="Seconds"
								min="0"
							/>
						</div>
						<div className="flex flex-col mb-4">
							<input
								type="text"
								value={newPlayerOneName}
								onChange={handlePlayerOneNameChange}
								className="w-full p-2 mb-2 border rounded-md bg-opacity-30"
								placeholder="Player One Name"
							/>
							<input
								type="text"
								value={newPlayerTwoName}
								onChange={handlePlayerTwoNameChange}
								className="w-full p-2 border rounded-md bg-opacity-30"
								placeholder="Player Two Name"
							/>
						</div>
						{error && <p className="mt-2 text-red-500">{error}</p>}
						<div className="flex justify-end w-full mt-4 space-x-4">
							<button
								onClick={() => setShowGameSettingsModal(false)}
								className="px-4 py-2 bg-gray-300 rounded-md"
							>
								Cancel
							</button>
							<button
								onClick={saveGameSettings}
								className="px-4 py-2 text-white bg-blue-500 rounded-md"
							>
								Save
							</button>
						</div>
					</div>
				</div>
			)}

			{/* Game Over Notification */}
			<div className="pb-12">
				{!gameOver ? (
					<div className="px-4 py-2 text-4xl font-bold rounded-full bg-slate-800">
						<h2>Let&apos;s start the game!</h2>
					</div>
				) : (
					<div className="text-center">
						<p className="text-red-500">Time&apos;s up!</p>
						<p className="text-4xl">Winner: {winner} 🎉</p>
					</div>
				)}
			</div>

			{/* Countdown Timer */}
			<div className="flex justify-center">
				<CountdownTimer
					duration={`${minutes}m${seconds}s`}
					isRunning={isRunning}
					resetKey={resetKey}
					onTimeUp={handleTimeUp}
				/>
			</div>

			{/* Scores */}
			<div className="flex items-center justify-center space-x-8 font-bold">
				{/* Player One's Score */}
				<div className="flex flex-col items-center w-32 h-32">
					<span className="text-6xl">{playerOne.score}</span>
					<span>{playerOne.name}</span>
				</div>

				{/* Divider */}
				<div className="flex items-center">
					<div className="px-4 py-2 rounded-full bg-slate-900">
						<div className="w-4 h-1 rounded-full bg-slate-400"></div>
					</div>
				</div>

				{/* Player Two's Score */}
				<div className="flex flex-col items-center w-32 h-32">
					<span className="text-6xl">{playerTwo.score}</span>
					<span>{playerTwo.name}</span>
				</div>
			</div>

			{/* Game Control */}
			<GameControl
				start={startTimer}
				pause={pauseTimer}
				reset={resetGame}
				isRunning={isRunning}
			/>

			{/* Set Game Button */}
			<div className="mb-4">
				<button
					onClick={() => setShowGameSettingsModal(true)}
					className="px-4 py-2 text-white rounded-md bg-slate-800"
				>
					Set Game
				</button>
			</div>

			{/* Adjust Score */}
			<AdjustScore
				addScore={() => addScore(playerOne, setPlayerOne)}
				subtractScore={() => subtractScore(playerOne, setPlayerOne)}
				addScoreTwo={() => addScore(playerTwo, setPlayerTwo)}
				subtractScoreTwo={() => subtractScore(playerTwo, setPlayerTwo)}
			/>
		</div>
	);
}
