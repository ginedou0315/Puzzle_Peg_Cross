function GameSetup({ onStartGame }) {
    try {
        const [playerCount, setPlayerCount] = React.useState(1);

        return (
            <div data-name="game-setup" className="game-setup text-center">
                <h2 className="text-2xl font-bold mb-4">Game Setup</h2>
                <div className="mb-4">
                    <label className="block text-lg mb-2">Number of Players:</label>
                    <select
                        data-name="player-count-select"
                        className="px-4 py-2 border rounded-lg"
                        value={playerCount}
                        onChange={(e) => setPlayerCount(Number(e.target.value))}
                    >
                        {[1, 2, 3, 4].map(num => (
                            <option key={num} value={num}>{num}</option>
                        ))}
                    </select>
                </div>
                <button
                    data-name="start-game-button"
                    className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    onClick={() => onStartGame(playerCount)}
                >
                    Start Game
                </button>
            </div>
        );
    } catch (error) {
        console.error('GameSetup component error:', error);
        reportError(error);
        return null;
    }
}
