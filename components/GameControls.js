function GameControls({
  moves,
  onReset,
  canUndo,
  onUndo,
  freeUndosLeft,
  onToggleHammer,
  isHammerActive,
  hammersLeft,
}) {
  try {
    return (
      <div
        data-name="game-controls"
        className="game-controls flex flex-col items-center gap-4 mt-6"
      >
        <div
          data-name="moves-counter"
          className="moves-counter text-xl font-bold text-gray-700"
        >
          Moves: {moves}
        </div>
        <div className="flex gap-4">
          <button
            data-name="hammer-button"
            className={`px-4 py-2 rounded-lg ${
              hammersLeft > 0
                ? isHammerActive
                  ? "bg-orange-500 ring-2 ring-white"
                  : "bg-orange-500 hover:bg-orange-600"
                : "bg-gray-400 cursor-not-allowed"
            } text-white font-semibold relative group`}
            onClick={onToggleHammer}
            disabled={hammersLeft === 0}
          >
            <i className="fas fa-hammer mr-2"></i>
            Hammer
            {hammersLeft > 0 && (
              <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {hammersLeft}
              </span>
            )}
          </button>
          <button
            data-name="undo-button"
            className={`px-4 py-2 rounded-lg ${
              canUndo
                ? "bg-yellow-500 hover:bg-yellow-600"
                : "bg-gray-400 cursor-not-allowed"
            } text-white font-semibold relative group`}
            onClick={onUndo}
            disabled={!canUndo}
          >
            <i className="fas fa-undo mr-2"></i>
            Undo
            {canUndo && freeUndosLeft > 0 && (
              <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {freeUndosLeft}
              </span>
            )}
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
    console.error("GameControls component error:", error);
    reportError(error);
    return null;
  }
}
