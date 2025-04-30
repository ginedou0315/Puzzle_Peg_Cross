function App() {
    try {
        const [gameStarted, setGameStarted] = React.useState(false);
        const [board, setBoard] = React.useState(null);
        const [selectedPeg, setSelectedPeg] = React.useState(null);
        const [validMoves, setValidMoves] = React.useState([]);
        const [players, setPlayers] = React.useState([]);
        const [currentPlayer, setCurrentPlayer] = React.useState(0);
        const [moveHistory, setMoveHistory] = React.useState([]);
        
        const handleStartGame = (playerCount) => {
            setBoard(createInitialBoard());
            setPlayers(Array(playerCount).fill().map(() => ({ moves: 0 })));
            setGameStarted(true);
        };
        
        const handlePegClick = (position) => {
            if (validMoves.includes(position)) {
                // Make the move
                const newBoard = makeMove(board, selectedPeg, position);
                setBoard(newBoard);
                
                // Update move history
                setMoveHistory([...moveHistory, { 
                    from: selectedPeg, 
                    to: position, 
                    board: [...board],
                    player: currentPlayer
                }]);
                
                // Update player moves
                const newPlayers = [...players];
                newPlayers[currentPlayer].moves++;
                setPlayers(newPlayers);
                
                // Reset selection
                setSelectedPeg(null);
                setValidMoves([]);
                
                // Check if next player has valid moves
                const nextPlayer = (currentPlayer + 1) % players.length;
                if (hasValidMovesForPlayer(newBoard)) {
                    setCurrentPlayer(nextPlayer);
                }
            } else if (board[position].filled) {
                // Select the peg
                setSelectedPeg(position);
                setValidMoves(getValidMoves(board, position));
            }
        };
        
        const handleReset = () => {
            setBoard(createInitialBoard());
            setSelectedPeg(null);
            setValidMoves([]);
            setPlayers(players.map(player => ({ ...player, moves: 0 })));
            setCurrentPlayer(0);
            setMoveHistory([]);
        };
        
        const handleUndo = () => {
            if (moveHistory.length > 0) {
                const lastMove = moveHistory[moveHistory.length - 1];
                setBoard(lastMove.board);
                setMoveHistory(moveHistory.slice(0, -1));
                
                // Update player moves
                const newPlayers = [...players];
                newPlayers[lastMove.player].moves--;
                setPlayers(newPlayers);
                
                setCurrentPlayer(lastMove.player);
                setSelectedPeg(null);
                setValidMoves([]);
            }
        };
        
        const isWin = board ? checkWin(board) : false;
        const isGameOver = board ? checkGameOver(board) : false;
        
        if (!gameStarted) {
            return (
                <div className="game-container flex flex-col items-center justify-center p-4">
                    <h1 data-name="game-title" className="game-title text-4xl font-bold mb-8">
                        Czech Puzzle Pegs Cross
                    </h1>
                    <GameSetup onStartGame={handleStartGame} />
                </div>
            );
        }
        
        return (
            <div data-name="game-container" className="game-container flex flex-col items-center justify-center p-4">
                <h1 data-name="game-title" className="game-title text-4xl font-bold mb-8">
                    Czech Puzzle Pegs Cross
                </h1>
                
                <PlayerInfo 
                    currentPlayer={currentPlayer}
                    players={players}
                    gameOver={isGameOver}
                />
                
                <div data-name="game-status" className="mb-6">
                    {isWin && (
                        <div className="win-message text-2xl font-bold text-green-600">
                            Game Complete! Player {currentPlayer + 1} wins!
                        </div>
                    )}
                    {isGameOver && !isWin && (
                        <div className="text-2xl font-bold text-red-600">
                            Game Over! Try again!
                        </div>
                    )}
                </div>
                
                <Board
                    board={board}
                    selectedPeg={selectedPeg}
                    validMoves={validMoves}
                    onPegClick={handlePegClick}
                />
                
                <GameControls
                    moves={players.reduce((total, player) => total + player.moves, 0)}
                    onReset={handleReset}
                    canUndo={moveHistory.length > 0}
                    onUndo={handleUndo}
                />
            </div>
        );
    } catch (error) {
        console.error('App component error:', error);
        reportError(error);
        return null;
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
