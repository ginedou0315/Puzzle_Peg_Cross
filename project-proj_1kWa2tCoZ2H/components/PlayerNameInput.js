function PlayerNameInput({ onSubmit }) {
    try {
        const [playerName, setPlayerName] = React.useState('');

        const handleSubmit = (e) => {
            e.preventDefault();
            if (playerName.trim()) {
                onSubmit(playerName.trim());
            }
        };

        return (
            <div data-name="player-name-input" className="player-name-container">
                <h2 className="text-2xl text-white mb-4">Enter Your Name</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                        type="text"
                        value={playerName}
                        onChange={(e) => setPlayerName(e.target.value)}
                        placeholder="Your Name"
                        className="px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20 focus:outline-none focus:border-white/40"
                        required
                        maxLength={20}
                    />
                    <button
                        type="submit"
                        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        Start Game
                    </button>
                </form>
            </div>
        );
    } catch (error) {
        console.error('PlayerNameInput component error:', error);
        reportError(error);
        return null;
    }
}
