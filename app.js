function App() {
    try {
        const [gameStarted, setGameStarted] = React.useState(false);
        const [playerName, setPlayerName] = React.useState('');
        const [board, setBoard] = React.useState(createInitialBoard());
        const [selectedPeg, setSelectedPeg] = React.useState(null);
        const [validMoves, setValidMoves] = React.useState([]);
        const [moves, setMoves] = React.useState(0);
        const [showTutorial, setShowTutorial] = React.useState(true);
        const [showSolution, setShowSolution] = React.useState(false);
        const [startTime, setStartTime] = React.useState(null);
        const [elapsedTime, setElapsedTime] = React.useState(0);
        const [highScores, setHighScores] = React.useState([]);
        const [gameStats, setGameStats] = React.useState({
            gamesPlayed: 0,
            wins: 0,
            totalMoves: 0,
            totalTime: 0
        });

        // Timer effect
        React.useEffect(() => {
            let timer;
            if (startTime) {
                timer = setInterval(() => {
                    setElapsedTime(Date.now() - startTime);
                }, 1000);
            }
            return () => clearInterval(timer);
        }, [startTime]);

        const handleStartGame = (e) => {
            e.preventDefault();
            if (playerName.trim()) {
                setGameStarted(true);
                setBoard(createInitialBoard());
                setMoves(0);
                setShowTutorial(true);
                setStartTime(null);
                setElapsedTime(0);
            }
        };

        const handlePegClick = (position) => {
            try {
                if (validMoves.includes(position)) {
                    // Start timer on first move if not started
                    if (!startTime) {
                        setStartTime(Date.now());
                    }

                    // Make the move
                    const newBoard = makeMove(board, selectedPeg, position);
                    setBoard(newBoard);
                    setMoves(moves + 1);
                    playMoveSound();

                    // Reset selection
                    setSelectedPeg(null);
                    setValidMoves([]);

                    // Check win condition
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

        const handleWin = () => {
            const finalTime = Date.now() - startTime;
            playWinSound();
            const newScore = {
                name: playerName,
                time: finalTime,
                moves: moves,
                avgMoveTime: Math.round(finalTime / moves)
            };
            
            setHighScores(prevScores => {
                const updatedScores = [...prevScores, newScore]
                    .sort((a, b) => a.time - b.time)
                    .slice(0, 10);
                localStorage.setItem('pegsCrossHighScores', JSON.stringify(updatedScores));
                return updatedScores;
            });

            setGameStats(prev => ({
                gamesPlayed: prev.gamesPlayed + 1,
                wins: prev.wins + 1,
                totalMoves: prev.totalMoves + moves,
                totalTime: prev.totalTime + finalTime
            }));
            
            alert("Congratulations! You've won!");
            setGameStarted(false);
        };

        const handleGameOver = () => {
            playInvalidSound();
            alert("No more valid moves available! Game Over!");
            setGameStarted(false);
        };

        return (
            <div data-name="game-container" className="min-h-screen flex flex-col p-4 bg-gradient-to-br from-blue-900 to-purple-900">
                {!gameStarted ? (
                    <div data-name="start-screen" className="flex flex-col items-center justify-center h-screen">
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
                        <form onSubmit={handleStartGame} className="flex flex-col items-center gap-4">
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
                    </div>
                ) : (
                    <div data-name="game-content" className="flex flex-col items-center mt-8">
                        <div className="flex justify-between items-center w-full max-w-screen-xl mb-6 px-8">
                            <Timer isRunning={!!startTime} elapsedTime={elapsedTime} />
                        </div>

                        <div data-name="board-container" className="bg-gray-800 rounded-xl shadow-2xl p-8 ml-8">
                            <Board
                                board={board}
                                selectedPeg={selectedPeg}
                                validMoves={validMoves}
                                onPegClick={handlePegClick}
                            />
                            <div className="mt-6 px-8 pb-6">
                                <GameControls
                                    moves={moves}
                                    onReset={() => {
                                        setBoard(createInitialBoard());
                                        setMoves(0);
                                        setSelectedPeg(null);
                                        setValidMoves([]);
                                        setStartTime(null);
                                        setElapsedTime(0);
                                    }}
                                    canUndo={false}
                                    onUndo={() => {}}
                                />
                            </div>
                        </div>

                        <div className="flex justify-center gap-8 mt-8 w-full max-w-screen-xl">
                            <GameStats stats={gameStats} />
                            <HighScores scores={highScores} />
                        </div>
                    </div>
                )}

                {showTutorial && gameStarted && (
                    <Tutorial onClose={() => setShowTutorial(false)} />
                )}

                {showSolution && (
                    <SolutionGuide onClose={() => setShowSolution(false)} />
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
