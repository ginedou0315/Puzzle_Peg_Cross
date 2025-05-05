function App() {
    try {
        const [gameStarted, setGameStarted] = React.useState(false);
        const [playerName, setPlayerName] = React.useState('');
        const [board, setBoard] = React.useState(createInitialBoard());
        const [selectedPeg, setSelectedPeg] = React.useState(null);
        const [validMoves, setValidMoves] = React.useState([]);
        const [moves, setMoves] = React.useState(0);
        const [showTutorial, setShowTutorial] = React.useState(true);
        const [startTime, setStartTime] = React.useState(null);
        const [elapsedTime, setElapsedTime] = React.useState(0);
        const [highScores, setHighScores] = React.useState([]);

        // Fetch high scores on mount and when game state changes
        React.useEffect(() => {
            fetchHighScores();
        }, [gameStarted]);

        React.useEffect(() => {
            let timer;
            if (startTime) {
                timer = setInterval(() => {
                    setElapsedTime(Date.now() - startTime);
                }, 1000);
            }
            return () => clearInterval(timer);
        }, [startTime]);

        const fetchHighScores = async () => {
            try {
                const response = await trickleListObjects('pegs-cross-scores', 10, true);
                const scores = response.items.map(item => ({
                    name: item.objectData.name,
                    moves: item.objectData.moves,
                    time: item.objectData.time
                }));
                setHighScores(scores);
            } catch (error) {
                console.error('Error fetching high scores:', error);
            }
        };

        const resetGame = () => {
            setBoard(createInitialBoard());
            setMoves(0);
            setSelectedPeg(null);
            setValidMoves([]);
            setStartTime(null);
            setElapsedTime(0);
            setShowTutorial(false);
        };

        const handleStartGame = (e) => {
            e.preventDefault();
            if (playerName.trim()) {
                setGameStarted(true);
                resetGame();
            }
        };

        const handlePegClick = (position) => {
            try {
                if (validMoves.includes(position)) {
                    if (!startTime) {
                        setStartTime(Date.now());
                    }

                    const newBoard = makeMove(board, selectedPeg, position);
                    setBoard(newBoard);
                    setMoves(moves + 1);
                    playMoveSound();

                    setSelectedPeg(null);
                    setValidMoves([]);

                    if (checkWin(newBoard)) {
                        handleWin();
                    } else if (checkGameOver(newBoard)) {
                        handleGameOver();
                    }
                } else if (board[position].filled) {
                    setSelectedPeg(position);
                    const newValidMoves = getValidMoves(board, position);
                    setValidMoves(newValidMoves);
                    if (newValidMoves.length === 0) {
                        playInvalidSound();
                    }
                }
            } catch (error) {
                console.error('Error in handlePegClick:', error);
                reportError(error);
            }
        };

        const handleWin = async () => {
            const finalTime = Date.now() - startTime;
            playWinSound();
            
            try {
                // Save score to Trickle database
                await trickleCreateObject('pegs-cross-scores', {
                    name: playerName,
                    moves: moves,
                    time: finalTime
                });

                // Refresh high scores
                await fetchHighScores();
            } catch (error) {
                console.error('Error saving score:', error);
            }

            alert(`Congratulations! You completed the game in ${moves} moves!`);
            const playAgain = window.confirm("Would you like to play again?");

            if (playAgain) {
                resetGame();
            } else {
                setGameStarted(false);
            }
        };

        const handleGameOver = () => {
            playInvalidSound();
            const playAgain = window.confirm(
                "No more valid moves available! Would you like to try again?"
            );

            if (playAgain) {
                resetGame();
            } else {
                setGameStarted(false);
            }
        };

        return (
            <div data-name="game-container" className="min-h-screen flex flex-col p-4 bg-gradient-to-br from-blue-900 to-purple-900">
                {!gameStarted ? (
                    <div data-name="start-screen" className="flex flex-col items-center justify-center min-h-screen py-8">
                        <h1 className="text-4xl font-bold text-white mb-8">Puzzle Pegs Cross</h1>
                        <div className="text-white text-center mb-8">
                            <p className="text-lg mb-4">Goal: Remove pegs by jumping over them until only one peg remains.</p>
                            <p className="text-md">Instructions:</p>
                            <ul className="list-disc text-left ml-6 mb-6">
                                <li>Select a peg to jump over another peg</li>
                                <li>The jumped-over peg will be removed</li>
                                <li>Continue until only one peg remains</li>
                                <li>The game is won when exactly one peg is left</li>
                                <li>Plan your moves carefully to avoid getting stuck!</li>
                            </ul>
                        </div>
                        <form onSubmit={handleStartGame} className="flex flex-col items-center gap-4 mb-8">
                            <input
                                type="text"
                                value={playerName}
                                onChange={(e) => setPlayerName(e.target.value)}
                                placeholder="Enter your name"
                                className="px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20 focus:outline-none focus:border-white/40"
                                required
                                maxLength={20}
                            />
                            <button
                                type="submit"
                                className="px-8 py-4 bg-green-500 text-white rounded-lg text-xl font-bold hover:bg-green-600 transition-colors"
                            >
                                Start Game
                            </button>
                        </form>
                        
                        {highScores.length > 0 && (
                            <div className="w-full max-w-screen-xl">
                                <HighScores scores={highScores} />
                            </div>
                        )}
                    </div>
                ) : (
                    <div data-name="game-content" className="flex flex-col items-center mt-8">
                        <div className="flex justify-between items-center w-full max-w-screen-xl mb-6 px-8">
                            <Timer isRunning={!!startTime} elapsedTime={elapsedTime} />
                        </div>

                        <div data-name="board-container" className="bg-gray-800 rounded-xl shadow-2xl p-8">
                            <h1 className="game-board-title">Puzzle Pegs Cross Game</h1>
                            <Board
                                board={board}
                                selectedPeg={selectedPeg}
                                validMoves={validMoves}
                                onPegClick={handlePegClick}
                            />
                            <div className="mt-6 px-8 pb-6">
                                <GameControls
                                    moves={moves}
                                    onReset={resetGame}
                                    canUndo={false}
                                    onUndo={() => {}}
                                />
                            </div>
                        </div>

                        {highScores.length > 0 && (
                            <div className="mt-8 w-full max-w-screen-xl">
                                <HighScores scores={highScores} />
                            </div>
                        )}
                    </div>
                )}

                {showTutorial && gameStarted && (
                    <Tutorial onClose={() => setShowTutorial(false)} />
                )}
            </div>
        );
    } catch (error) {
        console.error('App component error:', error);
        reportError(error);
        return null;
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
