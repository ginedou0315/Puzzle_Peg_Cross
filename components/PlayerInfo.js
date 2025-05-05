function PlayerInfo({ currentPlayer, players, gameOver }) {
    try {
        return (
            <div data-name="player-info" className="player-info mb-6">
                <h2 className="text-xl font-semibold mb-2">Players</h2>
                <div className="flex gap-4">
                    {players.map((player, index) => (
                        <div
                            key={index}
                            data-name={`player-${index + 1}`}
                            className={`p-3 rounded-lg ${
                                currentPlayer === index 
                                    ? 'bg-blue-500 text-white' 
                                    : 'bg-gray-200'
                            }`}
                        >
                            <span className="font-bold">Player {index + 1}</span>
                            <span className="ml-2">({player.moves} moves)</span>
                        </div>
                    ))}
                </div>
                {!gameOver && (
                    <div className="mt-2 text-lg">
                        Player {currentPlayer + 1}'s turn
                    </div>
                )}
            </div>
        );
    } catch (error) {
        console.error('PlayerInfo component error:', error);
        reportError(error);
        return null;
    }
}
