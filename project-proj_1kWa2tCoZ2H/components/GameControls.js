function GameControls({ moves, onReset, canUndo, onUndo }) {
    try {
        return (
            <div data-name="game-controls" className="game-controls flex flex-col items-center gap-4 mt-6">
                <div data-name="moves-counter" className="moves-counter text-xl font-bold text-gray-700">
                    Moves: {moves}
                </div>
                <div className="flex gap-4">
                    <button
                        data-name="undo-button"
                        className={`px-4 py-2 rounded-lg ${
                            canUndo 
                                ? 'bg-yellow-500 hover:bg-yellow-600' 
                                : 'bg-gray-400 cursor-not-allowed'
                        } text-white font-semibold`}
                        onClick={onUndo}
                        disabled={!canUndo}
                    >
                        <i className="fas fa-undo mr-2"></i>
                        Undo
                    </button>
                    <button
                        data-name="reset-button"
                        className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-semibold"
                        onClick={onReset}
                    >
                        <i className="fas fa-sync-alt mr-2"></i>
                        Reset
                    </button>
                </div>
            </div>
        );
    } catch (error) {
        console.error('GameControls component error:', error);
        reportError(error);
        return null;
    }
}
